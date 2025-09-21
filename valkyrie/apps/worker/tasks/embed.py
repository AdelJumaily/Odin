"""Standalone embedding helpers for worker orchestration."""
from __future__ import annotations

import logging

from sqlalchemy.orm import Session

from valkyrie.apps.api.deps import db_session
from valkyrie.apps.api.models import Document, DocumentChunk
from valkyrie.apps.api.services.embeddings import get_embedding_service

logger = logging.getLogger(__name__)


def refresh_embeddings(document_id: str) -> int:
    embedding_service = get_embedding_service()
    with db_session() as session:
        document = session.get(Document, document_id)
        if not document:
            logger.error("Document %s not found for embeddings", document_id)
            return 0
        chunks = (
            session.query(DocumentChunk)
            .filter(DocumentChunk.document_id == document.id)
            .order_by(DocumentChunk.chunk_index)
            .all()
        )
        for chunk in chunks:
            chunk.embedding = embedding_service.embed_text(chunk.content)
        session.flush()
        return len(chunks)


__all__ = ["refresh_embeddings"]
