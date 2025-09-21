from fastapi import FastAPI
from sqlalchemy import text
from .db import engine
from .models import Base
from .routers import health
from .routers.ingest import router as ingest_router
from .routers.download import router as download_router
from .routers.list import router as list_router

import logging
logger = logging.getLogger("uvicorn.error")
try:
	# Attempt to import optional search router; may raise if module missing or broken
	from .routers import search as search_router
except Exception as exc:
	# Log but do not fail the whole application
	search_router = None
	logger.warning("Optional search router not available: %s", exc, exc_info=True)

app = FastAPI(title="Odin Valkyrie", version="0.1")

@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)

    with engine.begin() as con:
        # Users (api_key is UNIQUE)
        con.execute(text("""
            INSERT INTO users (name, api_key, role)
            VALUES (:n, :k, :r)
            ON CONFLICT (api_key) DO NOTHING
        """), [{"n":"CEO","k":"ceo-key-123","r":"ceo"},
               {"n":"Alice","k":"alice-key-123","r":"editor"},
               {"n":"Intern","k":"intern-key-123","r":"intern"}])

        # Projects (name is UNIQUE)
        con.execute(text("""
            INSERT INTO projects (name)
            VALUES (:n)
            ON CONFLICT (name) DO NOTHING
        """), [{"n":"Apollo"}, {"n":"Zephyr"}])

        # Project membership (avoid dup with NOT EXISTS)
        con.execute(text("""
            INSERT INTO project_membership (user_id, project_id)
            SELECT u.id, p.id
            FROM users u, projects p
            WHERE u.name = :uname AND p.name = :pname
              AND NOT EXISTS (
                SELECT 1 FROM project_membership pm
                WHERE pm.user_id = u.id AND pm.project_id = p.id
              )
        """), [{"uname":"Alice","pname":"Apollo"},
               {"uname":"Intern","pname":"Zephyr"}])

app.include_router(health.router)
app.include_router(ingest_router)
app.include_router(list_router)
app.include_router(download_router)
# Only include search router if it imported successfully and exposes `router`
if search_router and hasattr(search_router, "router"):
	app.include_router(search_router.router)