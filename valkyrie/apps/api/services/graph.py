"""Knowledge graph integration helpers."""
from __future__ import annotations

import json
import logging
from typing import Iterable, List

from neo4j.exceptions import ServiceUnavailable

from ..deps import get_neo4j_driver, get_redis_client

logger = logging.getLogger(__name__)


class GraphService:
    def __init__(self) -> None:
        self.driver = get_neo4j_driver()
        self.redis = get_redis_client()

    def _neo4j_available(self) -> bool:
        return self.driver is not None

    def upsert_entities(self, project_id: str, entities: Iterable[dict]) -> None:
        if self._neo4j_available():
            try:
                with self.driver.session() as session:  # type: ignore[union-attr]
                    for entity in entities:
                        session.execute_write(
                            _cypher_upsert_entity,
                            project_id,
                            entity.get("canonical_name"),
                            entity.get("entity_type", "UNKNOWN"),
                            entity.get("aliases", []),
                            entity.get("attributes", {}),
                        )
                return
            except ServiceUnavailable as exc:  # pragma: no cover
                logger.error("Neo4j unavailable: %s", exc)
        # Fallback to Redis adjacency lists
        key = f"graph:{project_id}:entities"
        stored = {item["canonical_name"]: item for item in json.loads(self.redis.get(key) or "[]")}
        for entity in entities:
            stored[entity["canonical_name"]] = entity
        self.redis.set(key, json.dumps(list(stored.values())))

    def upsert_relations(self, project_id: str, relations: Iterable[dict]) -> None:
        if self._neo4j_available():
            try:
                with self.driver.session() as session:  # type: ignore[union-attr]
                    for relation in relations:
                        session.execute_write(
                            _cypher_upsert_relation,
                            project_id,
                            relation.get("source"),
                            relation.get("target"),
                            relation.get("relation_type", "RELATED_TO"),
                        )
                return
            except ServiceUnavailable as exc:  # pragma: no cover
                logger.error("Neo4j unavailable: %s", exc)
        key = f"graph:{project_id}:relations"
        stored = json.loads(self.redis.get(key) or "[]")
        stored.extend(relations)
        self.redis.set(key, json.dumps(stored))

    def get_related_entities(self, project_id: str, entity_name: str) -> List[dict]:
        if self._neo4j_available():
            with self.driver.session() as session:  # type: ignore[union-attr]
                result = session.execute_read(_cypher_related_entities, project_id, entity_name)
                return [record["related"] for record in result]
        entities = json.loads(self.redis.get(f"graph:{project_id}:relations") or "[]")
        related = []
        for relation in entities:
            if relation.get("source") == entity_name:
                related.append({"canonical_name": relation.get("target"), "relation_type": relation.get("relation_type")})
            if relation.get("target") == entity_name:
                related.append({"canonical_name": relation.get("source"), "relation_type": relation.get("relation_type")})
        return related

    def get_subgraph(self, project_id: str, root: str, depth: int = 2) -> dict:
        if self._neo4j_available():
            with self.driver.session() as session:  # type: ignore[union-attr]
                result = session.execute_read(_cypher_subgraph, project_id, root, depth)
                nodes = []
                edges = []
                for record in result:
                    nodes.append(record["node"])
                    edges.append(record["rel"])
                return {"nodes": nodes, "edges": edges}
        entities = json.loads(self.redis.get(f"graph:{project_id}:entities") or "[]")
        relations = json.loads(self.redis.get(f"graph:{project_id}:relations") or "[]")
        nodes = [entity for entity in entities if entity.get("canonical_name") == root]
        edges = [rel for rel in relations if root in (rel.get("source"), rel.get("target"))]
        return {"nodes": nodes, "edges": edges}


def _cypher_upsert_entity(tx, project_id: str, canonical: str, entity_type: str, aliases, attributes):
    tx.run(
        """
        MERGE (e:Entity {project_id: $project_id, canonical_name: $canonical})
        SET e.entity_type = $entity_type,
            e.aliases = $aliases,
            e.attributes = $attributes,
            e.updated_at = timestamp()
        """,
        project_id=project_id,
        canonical=canonical,
        entity_type=entity_type,
        aliases=aliases,
        attributes=attributes,
    )


def _cypher_upsert_relation(tx, project_id: str, source: str, target: str, relation_type: str):
    tx.run(
        """
        MATCH (s:Entity {project_id: $project_id, canonical_name: $source})
        MATCH (t:Entity {project_id: $project_id, canonical_name: $target})
        MERGE (s)-[r:RELATION {project_id: $project_id, relation_type: $relation_type, target: $target}]->(t)
        SET r.updated_at = timestamp()
        """,
        project_id=project_id,
        source=source,
        target=target,
        relation_type=relation_type,
    )


def _cypher_related_entities(tx, project_id: str, entity: str):
    query = (
        "MATCH (e:Entity {project_id: $project_id, canonical_name: $entity})-"
        "[r:RELATION]->(related:Entity) RETURN related"
    )
    return tx.run(query, project_id=project_id, entity=entity)


def _cypher_subgraph(tx, project_id: str, root: str, depth: int):
    query = (
        "MATCH (root:Entity {project_id: $project_id, canonical_name: $root})"
        "CALL apoc.path.subgraphAll(root, {maxLevel: $depth}) YIELD nodes, relationships"
        " UNWIND nodes AS node UNWIND relationships AS rel RETURN DISTINCT node, rel"
    )
    return tx.run(query, project_id=project_id, root=root, depth=depth)


def get_graph_service() -> GraphService:
    return GraphService()

