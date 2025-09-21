"""Document indexing and ingestion helpers."""
from __future__ import annotations

import hashlib
import logging
import uuid
from typing import Iterable, List, Tuple

from sqlalchemy import select
from sqlalchemy.orm import Session

from ..config import get_settings
from ..models import Document, DocumentChunk, Entity, Relation
from .embeddings import EmbeddingService, get_embedding_service
from .entity_extract import EntityExtractor, get_entity_extractor
from .graph import GraphService, get_graph_service

logger = logging.getLogger(__name__)


def _token_count(text: str) -> int:
    return max(1, len(text.split()))


class IndexingService:
    def __init__(
        self,
        embedding_service: EmbeddingService | None = None,
        entity_extractor: EntityExtractor | None = None,
        graph_service: GraphService | None = None,
    ) -> None:
        self.settings = get_settings()
        self.embedding_service = embedding_service or get_embedding_service()
        self.entity_extractor = entity_extractor or get_entity_extractor()
        self.graph_service = graph_service or get_graph_service()

    def split_text(self, text: str) -> List[str]:
        if not text:
            return []
        tokens = text.split()
        chunk_size = self.settings.chunk_size
        overlap = self.settings.chunk_overlap
        chunks: List[str] = []
        start = 0
        while start < len(tokens):
            end = min(len(tokens), start + chunk_size)
            chunk_tokens = tokens[start:end]
            chunks.append(" ".join(chunk_tokens))
            start = end - overlap
            if start <= 0:
                start = end
        return chunks

    def _ensure_entities(self, db: Session, project_id: uuid.UUID, entities: Iterable[dict]) -> List[Entity]:
        stored: List[Entity] = []
        for entity in entities:
            stmt = select(Entity).where(
                Entity.project_id == project_id,
                Entity.canonical_name == entity["canonical_name"],
            )
            existing = db.execute(stmt).scalar_one_or_none()
            if existing:
                aliases = set(existing.aliases or []) | set(entity.get("aliases", []))
                existing.aliases = list(aliases)
                stored.append(existing)
                continue
            created = Entity(
                project_id=project_id,
                canonical_name=entity["canonical_name"],
                entity_type=entity.get("entity_type", "UNKNOWN"),
                aliases=entity.get("aliases", []),
                attributes=entity.get("attributes", {}),
            )
            db.add(created)
            stored.append(created)
        db.flush()
        return stored

    def _ensure_relations(
        self,
        db: Session,
        project_id: uuid.UUID,
        entities_by_name: dict[str, Entity],
        relations: Iterable[dict],
    ) -> List[Relation]:
        stored: List[Relation] = []
        for relation in relations:
            source = entities_by_name.get(relation["source"])
            target = entities_by_name.get(relation["target"])
            if not source or not target:
                continue
            stmt = select(Relation).where(
                Relation.project_id == project_id,
                Relation.source_entity_id == source.id,
                Relation.target_entity_id == target.id,
                Relation.relation_type == relation.get("relation_type", "RELATED_TO"),
            )
            existing = db.execute(stmt).scalar_one_or_none()
            if existing:
                stored.append(existing)
                continue
            created = Relation(
                project_id=project_id,
                source_entity_id=source.id,
                target_entity_id=target.id,
                relation_type=relation.get("relation_type", "RELATED_TO"),
                attributes=relation.get("attributes", {}),
            )
            db.add(created)
            stored.append(created)
        db.flush()
        return stored

    def index_document(
        self,
        db: Session,
        document: Document,
        text: str,
    ) -> Tuple[List[DocumentChunk], List[Entity], List[Relation]]:
        chunks_text = self.split_text(text)
        embeddings = self.embedding_service.embed_batch(chunks_text)
        extracted_entities = self.entity_extractor.extract(text)
        extracted_relations = self.entity_extractor.extract_relations(text, extracted_entities)

        created_chunks: List[DocumentChunk] = []
        for idx, (chunk_text, embedding) in enumerate(zip(chunks_text, embeddings)):
            chunk = DocumentChunk(
                document_id=document.id,
                project_id=document.project_id,
                chunk_index=idx,
                content=chunk_text,
                content_hash=hashlib.sha256(chunk_text.encode("utf-8")).hexdigest(),
                tokens=_token_count(chunk_text),
                embedding=embedding,
                attributes={"source": document.source},
            )
            db.add(chunk)
            created_chunks.append(chunk)

        db.flush()

        graph_entities = [
            {
                "canonical_name": entity.canonical_name,
                "entity_type": entity["entity_type"],
                "aliases": entity.get("aliases", []),
                "attributes": {"document_id": str(document.id)},
            }
            for entity in extracted_entities
        ]
        stored_entities = self._ensure_entities(db, document.project_id, graph_entities)
        entity_map = {entity.canonical_name: entity for entity in stored_entities}

        graph_relations = [
            {
                "source": rel["source"],
                "target": rel["target"],
                "relation_type": rel.get("relation_type", "RELATED_TO"),
                "attributes": {"document_id": str(document.id)},
            }
            for rel in extracted_relations
        ]
        stored_relations = self._ensure_relations(db, document.project_id, entity_map, graph_relations)

        if graph_entities:
            self.graph_service.upsert_entities(str(document.project_id), graph_entities)
        if graph_relations:
            self.graph_service.upsert_relations(str(document.project_id), graph_relations)

        return created_chunks, stored_entities, stored_relations


_indexing_service = IndexingService()


def get_indexing_service() -> IndexingService:
    return _indexing_service
