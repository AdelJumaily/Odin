"""Ingestion pipeline orchestration."""
from __future__ import annotations

import json
import logging
from pathlib import Path

from sqlalchemy.orm import Session

from valkyrie.apps.api.deps import db_session, get_redis_client
from valkyrie.apps.api.models import Document, IngestJob, IngestStatus
from valkyrie.apps.api.services.indexing import get_indexing_service

logger = logging.getLogger(__name__)


def _read_document(document: Document) -> str:
    if not document.storage_path:
        return ""
    path = Path(document.storage_path)
    try:
        return path.read_text(encoding="utf-8", errors="ignore")
    except UnicodeDecodeError:
        return path.read_bytes().decode("utf-8", errors="ignore")
    except FileNotFoundError:
        logger.error("Document file missing: %s", path)
        return ""


def run_ingest_job(job_id: int) -> None:
    indexing_service = get_indexing_service()
    redis_client = get_redis_client()

    with db_session() as session:
        job = session.get(IngestJob, job_id)
        if not job:
            logger.error("Ingest job %s not found", job_id)
            return
        job.status = IngestStatus.extracting
        session.flush()
        document = session.get(Document, job.document_id)
        if not document:
            job.status = IngestStatus.failed
            job.error_message = "Document not found"
            session.flush()
            return
        redis_client.publish(
            "valkyrie.events",
            json.dumps({"type": "ingest", "status": job.status.value, "document_id": str(document.id)}),
        )
        text = _read_document(document)
        if not text:
            job.status = IngestStatus.failed
            job.error_message = "Document empty"
            session.flush()
            return
        job.status = IngestStatus.embedding
        session.flush()
        chunks, entities, relations = indexing_service.index_document(session, document, text)
        job.status = IngestStatus.graph
        session.flush()
        job.status = IngestStatus.completed
        session.flush()
        redis_client.publish(
            "valkyrie.events",
            json.dumps(
                {
                    "type": "ingest",
                    "status": job.status.value,
                    "document_id": str(document.id),
                    "chunks": len(chunks),
                    "entities": len(entities),
                    "relations": len(relations),
                }
            ),
        )


__all__ = ["run_ingest_job"]
