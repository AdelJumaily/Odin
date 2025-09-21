"""FastAPI application factory and entrypoint (placeholder)."""
from fastapi import FastAPI


def create_app() -> FastAPI:
    app = FastAPI(title="Valkyrie API")

    # Include routers (placeholders)
    try:
        from .routers import auth, users, projects, ingest, search, admin

        app.include_router(auth.router, prefix="/auth")
        app.include_router(users.router, prefix="/users")
        app.include_router(projects.router, prefix="/projects")
        app.include_router(ingest.router, prefix="/ingest")
        app.include_router(search.router, prefix="/search")
        app.include_router(admin.router, prefix="/admin")
    except Exception:
        # Routers may not exist yet during scaffold
        pass

    return app


app = create_app()


@app.get("/health")
async def health() -> dict:
    return {"status": "ok"}
