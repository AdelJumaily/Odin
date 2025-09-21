"""FastAPI application factory for Valkyrie."""
from __future__ import annotations

import asyncio
import json
import logging
from typing import Any

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware

from .config import get_settings
from .deps import engine, get_redis_client
from .models import Base
from .routers import admin, auth, ingest, projects, search, users
from .ws import get_event_hub

logger = logging.getLogger(__name__)


def create_app() -> FastAPI:
    settings = get_settings()
    app = FastAPI(title="Valkyrie API", version="0.1.0")
    app.add_middleware(
        SessionMiddleware,
        secret_key=settings.secret_key,
        same_site="lax",
        https_only=False,
    )
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(auth.router)
    app.include_router(users.router)
    app.include_router(projects.router)
    app.include_router(ingest.router)
    app.include_router(search.router)
    app.include_router(admin.router)
    # Legacy frontend compatibility endpoints mounted at /api
    # Import the APIRouter object from the compat module and mount it at /api
    from .routers.compat import router as compat_router

    app.include_router(compat_router, prefix="/api")

    event_hub = get_event_hub()

    @app.on_event("startup")
    async def startup() -> None:
        Base.metadata.create_all(bind=engine)
        asyncio.create_task(_redis_event_listener(event_hub))
        logger.info("Valkyrie API started")

    @app.on_event("shutdown")
    async def shutdown() -> None:
        logger.info("Valkyrie API shutting down")

    @app.get("/health")
    async def health() -> dict[str, Any]:
        return {"status": "ok"}

    @app.websocket("/ws/events")
    async def ws_events(ws: WebSocket):
        await event_hub.connect(ws)
        try:
            while True:
                await ws.receive_text()
        except WebSocketDisconnect:
            await event_hub.disconnect(ws)

    return app


async def _redis_event_listener(event_hub):
    redis = get_redis_client()
    pubsub = redis.pubsub()
    pubsub.subscribe("valkyrie.events")
    loop = asyncio.get_event_loop()

    def _reader():
        for message in pubsub.listen():
            if message.get("type") != "message":
                continue
            data = message.get("data")
            if isinstance(data, bytes):
                payload = json.loads(data.decode("utf-8"))
            elif isinstance(data, str):
                payload = json.loads(data)
            else:
                payload = data
            asyncio.run_coroutine_threadsafe(event_hub.broadcast(payload), loop)

    await asyncio.to_thread(_reader)


app = create_app()
