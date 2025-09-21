"""Embedding service using deterministic hashing fallback."""
from __future__ import annotations

import hashlib
import math
from typing import Iterable, List

import numpy as np

from ..config import get_settings


class EmbeddingService:
    def __init__(self, dimensions: int | None = None) -> None:
        settings = get_settings()
        self.dimensions = dimensions or settings.embedding_dimensions

    def embed_text(self, text: str) -> List[float]:
        # Deterministic embedding derived from SHA256 hash chunks
        if not text:
            return [0.0] * self.dimensions
        digest = hashlib.sha256(text.encode("utf-8")).digest()
        repeats = math.ceil(self.dimensions / len(digest))
        raw = (digest * repeats)[: self.dimensions]
        array = np.frombuffer(raw, dtype=np.uint8).astype(np.float32)
        norm = np.linalg.norm(array)
        if norm == 0:
            return array.tolist()
        return (array / norm).tolist()

    def embed_batch(self, texts: Iterable[str]) -> List[List[float]]:
        return [self.embed_text(text) for text in texts]


_embedding_service = EmbeddingService()


def get_embedding_service() -> EmbeddingService:
    return _embedding_service
