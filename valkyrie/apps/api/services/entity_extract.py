"""Entity extraction helpers."""
from __future__ import annotations

import logging
import re
from typing import Iterable, List


logger = logging.getLogger(__name__)

try:
    import spacy

    _nlp = spacy.load("en_core_web_sm")  # type: ignore[assignment]
except Exception:  # pragma: no cover
    _nlp = None
    logger.warning("spaCy model unavailable; falling back to regex-based entity extraction")


class ExtractedEntity(dict):
    @property
    def canonical_name(self) -> str:
        return self.get("canonical_name", "")


class EntityExtractor:
    def extract(self, text: str) -> List[ExtractedEntity]:
        if not text:
            return []
        if _nlp:
            doc = _nlp(text)
            entities = []
            for ent in doc.ents:
                entities.append(
                    ExtractedEntity(
                        canonical_name=ent.text,
                        entity_type=ent.label_,
                        aliases=[ent.text],
                    )
                )
            return entities
        pattern = re.compile(r"\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\b")
        seen = set()
        result: List[ExtractedEntity] = []
        for match in pattern.findall(text):
            key = match.lower()
            if key in seen:
                continue
            seen.add(key)
            result.append(
                ExtractedEntity(
                    canonical_name=match,
                    entity_type="UNKNOWN",
                    aliases=[match],
                )
            )
        return result

    def extract_relations(self, text: str, entities: Iterable[ExtractedEntity]) -> List[dict]:
        # Placeholder for relation extraction; connect sequential entities
        entity_list = list(entities)
        relations: List[dict] = []
        for idx in range(len(entity_list) - 1):
            relations.append(
                {
                    "source": entity_list[idx].canonical_name,
                    "target": entity_list[idx + 1].canonical_name,
                    "relation_type": "RELATED_TO",
                }
            )
        return relations


_entity_extractor = EntityExtractor()


def get_entity_extractor() -> EntityExtractor:
    return _entity_extractor
