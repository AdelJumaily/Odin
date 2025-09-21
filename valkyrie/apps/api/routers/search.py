import math

import numpy as np
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from .. import schemas
from ..deps import (
    get_db,
    get_optional_api_key,
    get_optional_user,
)
from ..models import ApiKey, DocumentChunk, Project, ProjectMembership, User, UserRole
from ..services.embeddings import get_embedding_service
from ..services.graph import get_graph_service

router = APIRouter(prefix="/search", tags=["search"])


def _ensure_project_access(db: Session, project_id: str, user: User | None, api_key: ApiKey | None) -> None:
    if not user and not api_key:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required")
    project = db.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    if user:
        membership = (
            db.query(ProjectMembership)
            .filter(ProjectMembership.project_id == project_id, ProjectMembership.user_id == user.id)
            .one_or_none()
        )
        if not membership:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Project access denied")
    if api_key and str(api_key.project_id) != project_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="API key scoped to different project")


@router.get("/", response_model=schemas.SearchResponse)
async def hybrid_search(
    project_id: str,
    q: str,
    mode: str = "hybrid",
    limit: int = 20,
    current_user: User | None = Depends(get_optional_user),
    api_key: ApiKey | None = Depends(get_optional_api_key),
    db: Session = Depends(get_db),
):
    if not q:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Query required")
    _ensure_project_access(db, project_id, current_user, api_key)

    embedding_service = get_embedding_service()
    query_embedding = None
    if mode in {"hybrid", "vector"}:
        query_embedding = np.array(embedding_service.embed_text(q), dtype=float)

    chunks = (
        db.query(DocumentChunk)
        .filter(DocumentChunk.project_id == project_id)
        .limit(500)
        .all()
    )

    results = []
    query_lower = q.lower()
    for chunk in chunks:
        score = 0.0
        if mode in {"hybrid", "keyword"} and query_lower in chunk.content.lower():
            score += 0.6
        if mode in {"hybrid", "vector"} and chunk.embedding and query_embedding is not None:
            chunk_vector = np.array(chunk.embedding, dtype=float)
            denom = (np.linalg.norm(chunk_vector) * np.linalg.norm(query_embedding))
            cosine = float(np.dot(chunk_vector, query_embedding) / denom) if denom else 0.0
            score += cosine
        if score <= 0:
            continue
        results.append(
            schemas.SearchResultChunk(
                document_id=str(chunk.document_id),
                chunk_index=chunk.chunk_index,
                content=chunk.content[:1000],
                score=score,
                source=chunk.attributes.get("source") if chunk.attributes else None,
            )
        )

    results.sort(key=lambda item: item.score, reverse=True)
    return schemas.SearchResponse(query=q, mode=mode, chunks=results[:limit])


@router.get("/graph", response_model=schemas.GraphResponse)
async def graph_search(
    project_id: str,
    entity: str,
    depth: int = 2,
    current_user: User | None = Depends(get_optional_user),
    api_key: ApiKey | None = Depends(get_optional_api_key),
    db: Session = Depends(get_db),
):
    if not entity:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Entity required")
    _ensure_project_access(db, project_id, current_user, api_key)
    graph_service = get_graph_service()
    subgraph = graph_service.get_subgraph(project_id, entity, depth)
    nodes = [
        schemas.GraphNode(
            canonical_name=node.get("canonical_name") or node.get("name"),
            entity_type=node.get("entity_type"),
            attributes=node.get("attributes"),
        )
        for node in subgraph.get("nodes", [])
    ]
    edges = [
        schemas.GraphEdge(
            source=edge.get("source") or edge.get("start"),
            target=edge.get("target") or edge.get("end"),
            relation_type=edge.get("relation_type", "RELATED_TO"),
            attributes=edge.get("attributes"),
        )
        for edge in subgraph.get("edges", [])
    ]
    return schemas.GraphResponse(root=entity, nodes=nodes, edges=edges)
