"""Graph synchronization tasks."""
from __future__ import annotations

import logging

from sqlalchemy.orm import Session

from valkyrie.apps.api.deps import db_session
from valkyrie.apps.api.models import Entity, Relation
from valkyrie.apps.api.services.graph import get_graph_service

logger = logging.getLogger(__name__)


def sync_project_graph(project_id: str) -> dict:
    graph_service = get_graph_service()
    with db_session() as session:
        entities = (
            session.query(Entity)
            .filter(Entity.project_id == project_id)
            .all()
        )
        relations = (
            session.query(Relation)
            .filter(Relation.project_id == project_id)
            .all()
        )
        entity_payload = [
            {
                "canonical_name": entity.canonical_name,
                "entity_type": entity.entity_type,
                "aliases": entity.aliases or [],
                "attributes": entity.attributes or {},
            }
            for entity in entities
        ]
        relation_payload = [
            {
                "source": session.get(Entity, relation.source_entity_id).canonical_name,
                "target": session.get(Entity, relation.target_entity_id).canonical_name,
                "relation_type": relation.relation_type,
            }
            for relation in relations
        ]
        graph_service.upsert_entities(project_id, entity_payload)
        graph_service.upsert_relations(project_id, relation_payload)
        logger.info(
            "Synced project %s graph with %s entities and %s relations",
            project_id,
            len(entity_payload),
            len(relation_payload),
        )
        return {"entities": len(entity_payload), "relations": len(relation_payload)}


__all__ = ["sync_project_graph"]
