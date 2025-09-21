"""Compatibility router to match legacy frontend endpoints.

This implements a small file-backed prototype store so the existing frontend
(`valkyrie/frontend`) can interact with a working API without requiring
Postgres/Neo4j/Redis to be installed.
"""
from __future__ import annotations

import json
import uuid
from pathlib import Path
from typing import Any

from fastapi import APIRouter, BackgroundTasks, Depends, File, UploadFile, HTTPException
from fastapi.responses import FileResponse

from ..ws import get_event_hub
from pathlib import Path
import hashlib
import re
import math


# Lightweight helpers to avoid importing the full app config and services.
def _root_dir() -> Path:
    # valkyrie/apps/api/routers -> go up 4 levels to valkyrie root
    return Path(__file__).resolve().parents[4]


def _store_base() -> Path:
    base = _root_dir() / "data"
    base.mkdir(parents=True, exist_ok=True)
    return base


def _embed_text(text: str, dimensions: int = 128):
    if not text:
        return [0.0] * dimensions
    digest = hashlib.sha256(text.encode("utf-8")).digest()
    repeats = math.ceil(dimensions / len(digest))
    raw = (digest * repeats)[:dimensions]
    arr = [float(b) for b in raw]
    norm = math.sqrt(sum(x * x for x in arr))
    if norm == 0:
        return arr
    return [x / norm for x in arr]


def _embed_batch(texts, dimensions: int = 128):
    return [_embed_text(t, dimensions) for t in texts]


def _extract_entities(text: str):
    pattern = re.compile(r"\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\b")
    seen = set()
    result = []
    for match in pattern.findall(text):
        key = match.lower()
        if key in seen:
            continue
        seen.add(key)
        result.append({"canonical_name": match, "entity_type": "UNKNOWN", "aliases": [match]})
    return result

router = APIRouter()

def _store_file() -> Path:
    data_dir = _store_base() / "compat_store"
    data_dir.mkdir(parents=True, exist_ok=True)
    return data_dir / "store.json"


def _load_store() -> dict[str, Any]:
    path = _store_file()
    if not path.exists():
        return {"projects": {}, "documents": {}, "chunks": {}, "jobs": {}, "entities": {}, "relations": []}
    try:
        return json.loads(path.read_text())
    except Exception:
        return {"projects": {}, "documents": {}, "chunks": {}, "jobs": {}, "entities": {}, "relations": []}


def _save_store(store: dict[str, Any]) -> None:
    path = _store_file()
    path.write_text(json.dumps(store, indent=2))


@router.get("/health")
async def health():
    return {"status": "ok"}


@router.post("/ingest")
async def ingest_endpoint(
    background: BackgroundTasks, file: UploadFile = File(...), project_id: str | None = None, owner_user_id: str | None = None
):
    store = _load_store()
    project_id = project_id or "default"
    if project_id not in store["projects"]:
        store["projects"][project_id] = {"id": project_id, "name": project_id}

    # save file
    dest_dir = _store_base() / "compat" / project_id
    dest_dir.mkdir(parents=True, exist_ok=True)
    doc_id = str(uuid.uuid4())
    dest_path = dest_dir / f"{doc_id}_{file.filename}"
    data = await file.read()
    dest_path.write_bytes(data)

    # register document
    store["documents"][doc_id] = {
        "id": doc_id,
        "project_id": project_id,
        "filename": file.filename,
        "storage_path": str(dest_path),
    }

    job_id = str(uuid.uuid4())
    store["jobs"][job_id] = {"id": job_id, "project_id": project_id, "document_id": doc_id, "status": "pending"}
    _save_store(store)

    background.add_task(_process_ingest, job_id)

    return {"document_id": doc_id, "job_id": job_id}


def _process_ingest(job_id: str) -> None:
    store = _load_store()
    job = store["jobs"].get(job_id)
    if not job:
        return
    job["status"] = "extracting"
    _save_store(store)

    doc = store["documents"].get(job["document_id"])
    if not doc:
        job["status"] = "failed"
        _save_store(store)
        return

    path = Path(doc["storage_path"])
    try:
        text = path.read_text(encoding="utf-8")
    except Exception:
        text = f"Binary file: {doc.get('filename')}"

    # split into simple chunks
    tokens = text.split()
    chunk_size = 200
    chunks = [" ".join(tokens[i : i + chunk_size]) for i in range(0, len(tokens), chunk_size)] or [text]
    embeddings = _embed_batch(chunks, dimensions=128)

    for idx, (content, emb) in enumerate(zip(chunks, embeddings)):
        chunk_id = f"{doc['id']}_{idx}"
        store["chunks"][chunk_id] = {
            "id": chunk_id,
            "document_id": doc["id"],
            "project_id": doc["project_id"],
            "index": idx,
            "content": content,
            "embedding": emb,
        }

    # extract entities
    entities = _extract_entities(text)
    for ent in entities:
        key = ent.canonical_name
        store["entities"].setdefault(doc["project_id"], {})[key] = {"canonical_name": ent.canonical_name, "type": ent.get("entity_type")}

    job["status"] = "completed"
    _save_store(store)

    # broadcast event if event hub present
    try:
        hub = get_event_hub()
        import asyncio

        asyncio.get_event_loop().create_task(hub.broadcast({"type": "ingest:completed", "job_id": job_id}))
    except Exception:
        pass


@router.get("/list")
async def list_files(project_id: str | None = None):
    store = _load_store()
    docs = list(store["documents"].values())
    if project_id:
        docs = [d for d in docs if d["project_id"] == project_id]
    return {"items": docs}


@router.get("/search/text")
async def search_text(project_id: str | None = None, q: str | None = None, limit: int = 20):
    if not q:
        raise HTTPException(status_code=400, detail="q required")
    store = _load_store()
    # collect chunks for project
    chunks = [c for c in store["chunks"].values() if (not project_id or c["project_id"] == project_id)]
    if not chunks:
        return {"chunks": []}
    q_emb = _embed_text(q, dimensions=128)
    # lightweight cosine similarity without numpy
    def cosine(a, b):
        dot = sum(x * y for x, y in zip(a, b))
        na = math.sqrt(sum(x * x for x in a))
        nb = math.sqrt(sum(x * x for x in b))
        if na == 0 or nb == 0:
            return 0.0
        return dot / (na * nb)
    results = []
    for c in chunks:
        if not c.get("embedding"):
            continue
        cv = c["embedding"]
        sc = cosine(cv, q_emb)
        if q.lower() in c.get("content", "").lower() or sc > 0.1:
            results.append({"document_id": c["document_id"], "chunk_index": c["index"], "content": c["content"][:1000], "score": float(sc)})
    results.sort(key=lambda r: r["score"], reverse=True)
    return {"query": q, "chunks": results[:limit]}


@router.get("/search/entity")
async def search_entity(project_id: str | None = None, type: str | None = None, value: str | None = None):
    store = _load_store()
    ents = store["entities"].get(project_id or "default", {})
    results = [v for k, v in ents.items() if (not type or v.get("type") == type) and (not value or value.lower() in k.lower())]
    return {"items": results}


@router.get("/search/connected")
async def search_connected(from_type: str | None = None, from_id: str | None = None, rel: str | None = None):
    # lightweight: return relations that match
    store = _load_store()
    relations = store.get("relations", [])
    items = [r for r in relations if (not rel or r.get("relation_type") == rel) and (not from_id or r.get("source") == from_id or r.get("target") == from_id)]
    return {"items": items}


@router.get("/download/{doc_id}")
async def download(doc_id: str):
    store = _load_store()
    doc = store["documents"].get(doc_id)
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    path = Path(doc.get("storage_path"))
    if not path.exists():
        raise HTTPException(status_code=404, detail="File missing")
    return FileResponse(path, filename=doc.get("filename") or path.name)
