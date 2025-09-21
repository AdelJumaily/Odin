"""Common dependency injection helpers."""
from __future__ import annotations

import logging
from contextlib import contextmanager
from functools import lru_cache
from typing import Generator, Optional

import redis
from fastapi import Cookie, Depends, Header, HTTPException, Request, status
from neo4j import GraphDatabase
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from .config import Settings, get_settings
from .models import ApiKey, ApiKeyScope, Project, ProjectMembership, User, UserRole
from .security import SESSION_COOKIE_NAME, decode_session_token

logger = logging.getLogger(__name__)


@lru_cache(maxsize=1)
def _engine_url() -> str:
    return get_settings().database_url


engine = create_engine(_engine_url(), future=True, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine, future=True)


@contextmanager
def db_session() -> Generator[Session, None, None]:
    session = SessionLocal()
    try:
        yield session
        session.commit()
    except Exception:
        session.rollback()
        raise
    finally:
        session.close()


from typing import AsyncGenerator

async def get_db() -> AsyncGenerator[Session, None]:
    with db_session() as session:
        yield session


@lru_cache(maxsize=1)
def get_redis_client() -> redis.Redis:
    settings = get_settings()
    return redis.from_url(settings.redis_url, decode_responses=True)


@lru_cache(maxsize=1)
def get_neo4j_driver():
    settings = get_settings()
    if not settings.neo4j_user or not settings.neo4j_password:
        logger.warning("Neo4j credentials not configured; graph operations disabled")
        return None
    return GraphDatabase.driver(settings.neo4j_url, auth=(settings.neo4j_user, settings.neo4j_password))


async def get_current_user(
    request: Request,
    session_token: Optional[str] = Cookie(default=None, alias=SESSION_COOKIE_NAME),
    db: Session = Depends(get_db),
) -> User:
    token = session_token or request.cookies.get(SESSION_COOKIE_NAME)
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")
    payload = decode_session_token(token)
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid session")
    user_id = payload.get("user_id")
    user = db.get(User, user_id)
    if not user or not user.is_active:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User inactive or not found")
    return user


async def get_optional_user(
    request: Request,
    session_token: Optional[str] = Cookie(default=None, alias=SESSION_COOKIE_NAME),
    db: Session = Depends(get_db),
) -> Optional[User]:
    try:
        return await get_current_user(request=request, session_token=session_token, db=db)
    except HTTPException as exc:
        if exc.status_code == status.HTTP_401_UNAUTHORIZED:
            return None
        raise


def require_project_role(*roles: UserRole | str):
    if roles:
        allowed = tuple(role.value if isinstance(role, UserRole) else role for role in roles)
    else:
        allowed = (
            UserRole.viewer.value,
            UserRole.ingestor.value,
            UserRole.maintainer.value,
            UserRole.owner.value,
        )

    async def dependency(
        project_id: str,
        user: User = Depends(get_current_user),
        db: Session = Depends(get_db),
    ) -> Project:
        project = db.get(Project, project_id)
        if not project:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
        membership = (
            db.query(ProjectMembership)
            .filter(ProjectMembership.project_id == project.id, ProjectMembership.user_id == user.id)
            .one_or_none()
        )
        if not membership:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized for project")
        if membership.role.value not in allowed and membership.role != UserRole.owner:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient role")
        return project

    return dependency


async def get_api_key(
    api_key_header: Optional[str] = Header(default=None, alias="X-API-Key"),
    db: Session = Depends(get_db),
) -> ApiKey:
    if not api_key_header:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing API key")
    api_key = db.query(ApiKey).filter(ApiKey.token == api_key_header).one_or_none()
    if not api_key:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid API key")
    return api_key


def require_api_key_scope(scope: ApiKeyScope):
    async def dependency(api_key: ApiKey = Depends(get_api_key)) -> ApiKey:
        if ApiKeyScope.admin.value not in api_key.scopes and scope.value not in api_key.scopes:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="API key missing scope")
        return api_key

    return dependency


def get_settings_dependency() -> Settings:
    return get_settings()
async def get_optional_api_key(
    api_key_header: Optional[str] = Header(default=None, alias="X-API-Key"),
    db: Session = Depends(get_db),
) -> Optional[ApiKey]:
    if not api_key_header:
        return None
    api_key = db.query(ApiKey).filter(ApiKey.token == api_key_header).one_or_none()
    return api_key
