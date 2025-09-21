"""Application configuration and dependency helpers."""
from __future__ import annotations

from functools import lru_cache
from pathlib import Path
from typing import Optional

from pydantic import BaseSettings, Field, validator


class Settings(BaseSettings):
    env: str = Field("development", alias="VALKYRIE_ENV")
    secret_key: str = Field("dev-secret-key", alias="VALKYRIE_SECRET_KEY")
    database_url: str = Field("postgresql+psycopg://valkyrie:valkyrie@localhost:5432/valkyrie", alias="VALKYRIE_DATABASE_URL")
    redis_url: str = Field("redis://localhost:6379/0", alias="VALKYRIE_REDIS_URL")
    neo4j_url: str = Field("bolt://localhost:7687", alias="VALKYRIE_NEO4J_URL")
    neo4j_user: Optional[str] = Field(None, alias="VALKYRIE_NEO4J_USER")
    neo4j_password: Optional[str] = Field(None, alias="VALKYRIE_NEO4J_PASSWORD")
    mail_from: str = Field("no-reply@valkyrie.local", alias="VALKYRIE_MAIL_FROM")
    mail_backend: str = Field("console", alias="VALKYRIE_MAIL_BACKEND")
    storage_path: Path = Field(Path("data/uploads"), alias="VALKYRIE_STORAGE_PATH")
    chunk_size: int = Field(800, alias="VALKYRIE_CHUNK_SIZE")
    chunk_overlap: int = Field(200, alias="VALKYRIE_CHUNK_OVERLAP")
    embedding_dimensions: int = Field(1536, alias="VALKYRIE_EMBED_DIMS")

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False

    @validator("storage_path", pre=True)
    def _expand_storage(cls, value: str | Path) -> Path:  # noqa: D401
        return Path(value).expanduser().resolve()


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    settings = Settings()
    settings.storage_path.mkdir(parents=True, exist_ok=True)
    return settings
