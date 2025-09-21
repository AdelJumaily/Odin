"""Middleware helpers for API key enforcement."""
from __future__ import annotations

from fastapi import FastAPI, Request

from ..models import ApiKeyScope
from ..deps import require_api_key_scope


def register_api_key_middleware(app: FastAPI) -> None:
    @app.middleware("http")
    async def api_key_logging(request: Request, call_next):
        # Tag request state so routers know whether API key auth succeeded via dependency
        request.state.api_key_scope = ApiKeyScope
        response = await call_next(request)
        return response


__all__ = ["register_api_key_middleware", "require_api_key_scope"]
