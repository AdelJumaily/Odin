from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from sqlalchemy import text
from .db import engine
from .models import Base
from .routers import health
from .routers.ingest import router as ingest_router
from .routers.download import router as download_router
from .routers.list import router as list_router
from .routers.auth import router as auth_router
from .routers.users import router as users_router

import logging
logger = logging.getLogger("uvicorn.error")
try:
	# Attempt to import optional search router; may raise if module missing or broken
	from .routers import search
	search_router = getattr(search, "router", None)
except Exception as exc:
	# Log but do not fail the whole application
	search_router = None
	logger.warning("Optional search router not available: %s", exc, exc_info=True)
# Add SQLAlchemy exception imports
from sqlalchemy.exc import ProgrammingError, SQLAlchemyError

# Add WebSocket, CORS and typing imports
from fastapi import WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from typing import Set
import asyncio

app = FastAPI(title="Odin Valkyrie", version="0.1")

# Log full DB ProgrammingError traceback, return concise JSON to client
@app.exception_handler(ProgrammingError)
async def sqlalchemy_programming_error_handler(request: Request, exc: ProgrammingError):
    logger.exception("Database ProgrammingError during %s %s", request.method, request.url, exc_info=exc)
    return JSONResponse(status_code=500, content={"detail": "database error: ProgrammingError"})

# Catch other SQLAlchemy errors as well
@app.exception_handler(SQLAlchemyError)
async def sqlalchemy_error_handler(request: Request, exc: SQLAlchemyError):
    logger.exception("SQLAlchemyError during %s %s", request.method, request.url, exc_info=exc)
    return JSONResponse(status_code=500, content={"detail": "database error: SQLAlchemyError"})

# Add a global exception handler to ensure full tracebacks are logged
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.exception("Unhandled exception during %s %s", request.method, request.url, exc_info=exc)
    return JSONResponse(status_code=500, content={"detail": "internal server error"})

@app.on_event("startup")
def startup():
    try:
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
    except Exception as exc:
        logger.exception("Exception during startup: %s", exc)
        raise

# Simple CORS for dev (adjust origins for production)
app.add_middleware(
	CORSMiddleware,
	allow_origins=["*"],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

# In-process WebSocket broadcaster (dev only; use Redis/pubsub for multi-worker)
_active_ws: Set[WebSocket] = set()
_ws_lock = asyncio.Lock()

@app.websocket("/ws/events")
async def ws_events(ws: WebSocket):
	await ws.accept()
	async with _ws_lock:
		_active_ws.add(ws)
	try:
		while True:
			# keep the connection alive; ignore incoming messages
			await ws.receive_text()
	except WebSocketDisconnect:
		pass
	finally:
		async with _ws_lock:
			_active_ws.discard(ws)

async def broadcast_event(event: dict):
	"""Send JSON event to all connected WS clients (best-effort)."""
	dead = []
	async with _ws_lock:
		conns = list(_active_ws)
	for ws in conns:
		try:
			await ws.send_json(event)
		except Exception:
			dead.append(ws)
	if dead:
		async with _ws_lock:
			for ws in dead:
				_active_ws.discard(ws)

@app.on_event("shutdown")
async def shutdown():
	# clean up any in-memory websockets (no-op for most setups)
	async with _ws_lock:
		_active_ws.clear()

# Router includes:
# keep health as-is (health endpoints usually are non-/api), expose the API routers under /api
app.include_router(health.router)
app.include_router(auth_router, prefix="/api")
app.include_router(ingest_router, prefix="/api")
app.include_router(list_router, prefix="/api")
app.include_router(download_router, prefix="/api")
app.include_router(users_router, prefix="/api")
# Only include search router if it imported successfully and is a router instance
if search_router:
	app.include_router(search_router, prefix="/api")