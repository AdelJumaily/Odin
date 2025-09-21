"""Minimal app that mounts only the compatibility router.

This avoids importing other modules that require heavy optional deps (Neo4j, Redis, itsdangerous)
so you can run a quick prototype with fewer packages installed.
"""
from fastapi import FastAPI

from .routers.compat import router as compat_router


def create_app() -> FastAPI:
    app = FastAPI(title="Valkyrie (compat prototype)")
    app.include_router(compat_router, prefix="/api")

    @app.get("/health")
    async def health():
        return {"status": "ok"}

    return app


app = create_app()
