from fastapi import FastAPI
from sqlalchemy import text
from .db import engine
from .models import Base
from .routers import health
from .routers.ingest import router as ingest_router
from .routers.download import router as download_router
from .routers.list import router as list_router

app = FastAPI(title="Oden Valkyrie", version="0.1.0")

@app.on_event("startup")
def startup():
    Base.metadata.create_all(engine)

    with engine.begin() as con:
        con.execute(text("""
          INSERT INTO users(name, api_key, role)
          SELECT 'CEO','ceo-key-123','ceo'
          WHERE NOT EXISTS(SELECT 1 FROM users WHERE api_key='ceo-key-123');
        """))
        con.execute(text("""
          INSERT INTO users(name, api_key, role)
          SELECT 'Alice','alice-key-123','editor'
          WHERE NOT EXISTS(SELECT 1 FROM users WHERE api_key='alice-key-123');
        """))
        con.execute(text("""
          INSERT INTO users(name, api_key, role)
          SELECT 'Intern','intern-key-123','intern'
          WHERE NOT EXISTS(SELECT 1 FROM users WHERE api_key='intern-key-123');
        """))
        con.execute(text("""
          INSERT INTO projects(name) SELECT 'Apollo
          WHERE NOT EXISTS(SELECT 1 FROM projects WHERE name='Apollo');
        """))
        con.execute(text("""
          INSERT INTO projects(name) SELECT 'Zepher
          WHERE NOT EXISTS(SELECT 1 FROM projects WHERE name='Zepher');
        """))
        con.execute(text("""
          INSERT INTO project_membership(user_id, project_id)
          SELECT u.id, p.id FROM users u, projects p
          WHERE u.name='Alice' AND p.name='Apollo'
          AND NOT EXISTS (SELECT 1 FROM project_membership pm WHERE pm.user_id=u.id AND pm.project_id=p.id);
        """))

app.include_router(health.router)
app.include_router(ingest_router)
app.include_router(download_router)
app.include_router(list_router)