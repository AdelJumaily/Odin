#!/usr/bin/env bash
# valkyrie/install.sh
# This script assumes it is executed from inside the `valkyrie/` folder on the target Linux server.
# It validates prerequisites, prepares data dirs, copies `env.docker` to `.env` if missing, and launches
# docker compose using the Pi override present in this folder.

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

echo "Valkyrie installer (valkyrie/install.sh) — running from $ROOT_DIR"

command -v docker >/dev/null 2>&1 || { echo "Docker not found — install Docker Engine." >&2; exit 1; }

if docker compose version >/dev/null 2>&1; then
  DOCKER_COMPOSE_CMD=(docker compose)
elif command -v docker-compose >/dev/null 2>&1; then
  DOCKER_COMPOSE_CMD=(docker-compose)
else
  echo "Docker Compose not found (neither 'docker compose' nor 'docker-compose' available)." >&2
  exit 1
fi

if ! docker info >/dev/null 2>&1; then
  echo "Docker daemon not running. Start Docker and re-run this script." >&2
  exit 1
fi

# Ensure compose files exist in this folder or configs/
if [ -f "${ROOT_DIR}/docker-compose.yml" ]; then
  COMPOSE_FILES=("-f" "${ROOT_DIR}/docker-compose.yml")
elif [ -f "${ROOT_DIR}/configs/docker-compose.yml" ]; then
  COMPOSE_FILES=("-f" "${ROOT_DIR}/configs/docker-compose.yml")
else
  echo "Could not find docker-compose.yml in this folder or configs/" >&2
  exit 1
fi

# Copy example env if .env is missing
if [ ! -f "${ROOT_DIR}/.env" ] && [ -f "${ROOT_DIR}/env.docker" ]; then
  echo "Copying env.docker -> .env"
  cp env.docker .env
fi

echo "Creating data directories"
mkdir -p data
mkdir -p database/local
mkdir -p valkyrie_data || true

echo "Starting docker compose"
# Validate compose file and interpolated env before starting
echo "Validating docker-compose configuration (this checks ${COMPOSE_FILES[*]})"
if ! ${DOCKER_COMPOSE_CMD[@]} "${COMPOSE_FILES[@]}" config >/dev/null 2>&1; then
  echo "docker compose configuration validation failed. Run 'docker compose config' for details." >&2
  ${DOCKER_COMPOSE_CMD[@]} "${COMPOSE_FILES[@]}" config || true
  exit 1
fi

echo "Bringing up docker compose stack"
${DOCKER_COMPOSE_CMD[@]} "${COMPOSE_FILES[@]}" up -d --build

echo "Waiting for Postgres to become available (timeout 120s)"

WAIT_SECONDS=120
ELAPSED=0
SLEEP=3
while [ $ELAPSED -lt $WAIT_SECONDS ]; do
  # try to run pg_isready inside the postgres container
  if ${DOCKER_COMPOSE_CMD[@]} exec -T postgres pg_isready -U valkyrie >/dev/null 2>&1; then
    echo "Postgres is ready"
    break
  fi
  echo "Postgres not ready yet... (${ELAPSED}s)"
  sleep $SLEEP
  ELAPSED=$((ELAPSED + SLEEP))
done

if [ $ELAPSED -ge $WAIT_SECONDS ]; then
  echo "Postgres did not become ready within ${WAIT_SECONDS}s; check 'docker compose logs postgres'" >&2
  exit 1
fi

echo "Running DB seed script inside the API service"
# Run seeder using the API image context so it has the same deps and env
${DOCKER_COMPOSE_CMD[@]} run --rm api python scripts/seed_db.py || {
  echo "Seeder failed; printing API container logs for debugging..." >&2
  ${DOCKER_COMPOSE_CMD[@]} logs api --tail=200
  exit 1
}

echo "Seeding complete. Check containers with: docker compose ps"

echo "Performing post-install health check against the API (via Caddy)..."

HEALTH_URL="http://localhost/api/health"
HEALTH_RETRIES=6
HEALTH_SLEEP=5
HEALTH_OK=1
for i in $(seq 1 $HEALTH_RETRIES); do
  if curl -fsS "$HEALTH_URL" >/dev/null 2>&1; then
    HEALTH_OK=0
    echo "API health check passed (attempt $i)."
    break
  else
    echo "API not healthy yet (attempt $i/$HEALTH_RETRIES). Retrying in ${HEALTH_SLEEP}s..."
    sleep $HEALTH_SLEEP
  fi
done

if [ $HEALTH_OK -ne 0 ]; then
  echo "WARNING: API health check failed after ${HEALTH_RETRIES} attempts. Check 'docker compose logs caddy api' for details." >&2
else
  echo "Valkyrie appears healthy. Visit the server in your browser or query ${HEALTH_URL}."
fi

echo "If the installer created an admin API key it was printed to stdout during seeding. Store it now — it will not be shown again." 
