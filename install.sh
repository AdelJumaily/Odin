#!/usr/bin/env bash
# Install and bring up Docker Compose services using the Pi override
# This script is idempotent and performs lightweight checks before running

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# Prefer top-level compose files, but fall back to configs/ if present there
if [ -f "${ROOT_DIR}/docker-compose.yml" ]; then
  COMPOSE_A=("-f" "${ROOT_DIR}/docker-compose.yml")
elif [ -f "${ROOT_DIR}/configs/docker-compose.yml" ]; then
  COMPOSE_A=("-f" "${ROOT_DIR}/configs/docker-compose.yml")
else
  echo "Could not find docker-compose.yml in root or configs/" >&2
  echo "Expected: ${ROOT_DIR}/docker-compose.yml or ${ROOT_DIR}/configs/docker-compose.yml" >&2
  exit 1
fi

echo "Running Valkyrie Pi install helper"

command -v docker >/dev/null 2>&1 || { echo "Docker is not installed or not in PATH. Please install Docker." >&2; exit 1; }

# On modern systems `docker compose` is available as a subcommand.
if docker compose version >/dev/null 2>&1; then
  DOCKER_COMPOSE_CMD=(docker compose)
elif command -v docker-compose >/dev/null 2>&1; then
  DOCKER_COMPOSE_CMD=(docker-compose)
else
  echo "Docker Compose is not available. Install Docker Compose or use Docker Engine with Compose v2." >&2
  exit 1
fi

# Ensure docker daemon is running
if ! docker info >/dev/null 2>&1; then
  echo "Docker daemon doesn't appear to be running. Start Docker and try again." >&2
  exit 1
fi

# Copy example env if .env is missing
if [ ! -f "${ROOT_DIR}/.env" ] && [ -f "${ROOT_DIR}/env.docker" ]; then
  echo "No .env found — copying env.docker to .env"
  cp "${ROOT_DIR}/env.docker" "${ROOT_DIR}/.env"
fi

echo "Creating data directories (if missing)"
mkdir -p "${ROOT_DIR}/valkyrie/data"
mkdir -p "${ROOT_DIR}/database/local"
mkdir -p "${ROOT_DIR}/data"

# On Linux, try to set permissive permissions for Docker volumes
if [ "$(uname -s)" = "Linux" ]; then
  chmod -R 755 "${ROOT_DIR}/valkyrie/data" || true
  chmod -R 755 "${ROOT_DIR}/database/local" || true
fi

echo "Launching Docker Compose with Pi override"

echo "Command: ${DOCKER_COMPOSE_CMD[*]} ${COMPOSE_A[*]} up -d --build"

# Run compose with the detected files (single compose file)
${DOCKER_COMPOSE_CMD[@]} "${COMPOSE_A[@]}" up -d --build

echo "Docker Compose launched. Use 'docker compose ps' to check containers."

exit 0
