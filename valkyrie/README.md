# Valkyrie

Valkyrie is a self-hosted knowledge ingestion and search platform designed for secure, multi-user teams. Upload files, extract entities, generate embeddings, and explore the resulting knowledge graph through hybrid keyword/vector search and graph navigation.

## Features

- **Multi-user access** with cookie sessions, magic links, and role-based permissions (Owner, Maintainer, Ingestor, Viewer).
- **Scoped API keys** for external clients with granular scopes like `ingest:write`, `search:read`, and `graph:read`.
- **Projects** to group documents, entities, relations, and keys per team or initiative.
- **Ingestion pipeline** backed by PostgreSQL + pgvector for chunk storage, deterministic embeddings, and optional Neo4j graph sync.
- **Knowledge graph** services with Neo4j (or Redis fallback) for entity/relationship exploration and graph-powered search expansion.
- **Real-time events** via Redis pub/sub surfaced through a WebSocket endpoint for ingest progress and notifications.
- **Dashboard-friendly APIs** covering document ingest, hybrid search, graph subgraphs, and admin telemetry.

## Architecture

| Component   | Role |
|-------------|------|
| FastAPI     | Auth, REST endpoints, WebSockets, session cookies |
| RQ Worker   | Runs ingestion pipeline, embedding refresh, graph sync |
| PostgreSQL  | Stores users, projects, documents, chunks, entities, relations |
| Redis       | Queue + cache + pub/sub for worker events |
| Neo4j       | Optional graph backend for entities/relations |
| React+Vite  | (Frontend scaffold in `frontend/`) consumes the API |

## Running Locally (Docker Compose)

```
cp configs/.env.example .env
poetry install
poetry run alembic upgrade head
# start infrastructure
docker compose up -d postgres redis neo4j
# start api and worker
poetry run uvicorn apps.api.main:app --host 0.0.0.0 --port 6789
poetry run python -m rq worker -c apps.worker.worker
```

Set the required environment variables (see **Configuration**) before launching services. For a full stack (including Caddy, frontend, and Mailpit) refer to `configs/docker-compose.yml`.

## Configuration

Environment variables (with defaults) are loaded from `.env`:

- `VALKYRIE_SECRET_KEY` � session + link signing secret (`dev-secret-key`).
- `VALKYRIE_DATABASE_URL` � PostgreSQL connection (`postgresql+psycopg://valkyrie:valkyrie@localhost:5432/valkyrie`).
- `VALKYRIE_REDIS_URL` � Redis URL (`redis://localhost:6379/0`).
- `VALKYRIE_NEO4J_URL`, `VALKYRIE_NEO4J_USER`, `VALKYRIE_NEO4J_PASSWORD` � graph backend credentials.
- `VALKYRIE_STORAGE_PATH` � filesystem path for uploaded documents (`data/uploads`).
- `VALKYRIE_MAIL_BACKEND` � defaults to console logging.

Port configuration
------------------

You can override host-side port mappings used by `docker compose` by setting environment variables in your `.env` file (the installer copies `env.docker` -> `.env` if missing). Example variables and defaults:

```
POSTGRES_HOST_PORT=5432
REDIS_HOST_PORT=6379
NEO4J_HTTP_HOST_PORT=7474
NEO4J_BOLT_HOST_PORT=7687
MAILPIT_HTTP_HOST_PORT=8025
MAILPIT_SMTP_HOST_PORT=1025
API_HOST_PORT=6789
FRONTEND_HOST_PORT=3000
HTTP_HOST_PORT=80
HTTPS_HOST_PORT=443
```

Set any of these in `.env` to avoid host port conflicts before running `./install.sh`.

## Core API Highlights

- `POST /auth/login` � password login, sets session cookie.
- `POST /auth/magic-link` / `GET /auth/magic-link/verify` � email-based auth.
- `GET /projects/` � list projects current user can access.
- `POST /projects/{id}/api-keys` � create scoped API key.
- `POST /ingest/projects/{id}` � upload document (requires session or API key with `ingest:write`).
- `GET /search/?project_id=...&q=...` � hybrid keyword/vector search over chunks.
- `GET /search/graph?project_id=...&entity=...` � graph neighborhood lookup.
- `WS /ws/events` � receive ingest updates (relayed from Redis pub/sub).

See `apps/api/schemas/__init__.py` for request/response models.

## Workers & Tasks

RQ queues live under the `ingest` namespace and execute:

- `run_ingest_job(job_id)` � reads stored document, chunks text, embeds, writes chunks/entities/relations, and broadcasts progress.
- `refresh_embeddings(document_id)` � recomputes embeddings for existing chunks.
- `sync_project_graph(project_id)` � replays entities/relations into Neo4j/Redis.

Start a worker with `poetry run python valkyrie/apps/worker/worker.py` or `poetry run rq worker ingest`.

## Database Migrations

Alembic migrations reside in `migrations/versions/`. Apply with `poetry run alembic upgrade head`. The initial revisions provision users, projects, documents, chunks, entities, relations, API keys, and ingest jobs tables.

## Frontend Scaffold

A companion React/Vite dashboard lives under `frontend/`. It offers login, project overview, upload workflows, search UI, and graph explorer components wired to the API contract above.

## Testing

```
poetry run pytest
```

Integration tests can target the REST API once services are running; sample scripts live under `test-valkyrie/`.

## Next Steps


Prototype compatibility layer
---------------------------

The repository contains a small compatibility router at `apps/api/routers/compat.py` that implements a simple
file-backed prototype store so the legacy frontend under `valkyrie/frontend` can talk to a working API without
requiring Postgres/Redis/Neo4j. This is intended as a quick way to evaluate the UI flow and UX.

Run the prototype locally (recommended: inside a venv)

PowerShell commands:

```powershell
cd 'c:\Users\myles\OneDrive\Desktop\Odin\valkyrie'
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
 uvicorn apps.api.simple_app:app --reload --port 6789
```

Then open the frontend (Vite) dev server or build the frontend and point Caddy to the built assets.

Notes and next steps
- The compat router is not a production DB; migrate to Postgres+pgvector and Neo4j for full functionality.
- Implement real background workers (RQ/Celery) and connect Redis for queueing and event notifications.
- Harden authentication, session storage, and API key lifecycle management.

