#!/usr/bin/env bash
set -e

echo "[ODIN • Valkyrie] Install script starting..."

# Ensure we're in the project root
cd "$(dirname "$0")"

# 0) Make sure host dirs exist (backend writes encrypted blobs here)
mkdir -p ./files
# Permissive for hackathon/dev. Tighten later if you want.
chmod 777 ./files || true

# 0.1) Ensure Postgres uses a named volume (avoid bind-mount perms forever)
if [ ! -f docker-compose.override.yml ]; then
  cat > docker-compose.override.yml <<'YAML'
services:
  postgres:
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata: {}
YAML
  echo "[+] Wrote docker-compose.override.yml to use a Docker named volume for Postgres."
else
  echo "[=] docker-compose.override.yml present; leaving it as-is."
fi

# 1. Create .env if missing
if [ ! -f ".env" ]; then
  echo "[+] Creating .env from .env.example..."
  cp .env.example .env

  echo "[+] Generating random API keys and AES secret..."
  ADMIN_KEY=$(openssl rand -hex 16)
  READER_KEY=$(openssl rand -hex 16)
  SECRET_KEY=$(openssl rand -base64 32)

  # Replace placeholders in .env
  sed -i.bak "s|changeme-admin|$ADMIN_KEY|" .env
  sed -i.bak "s|changeme-reader|$READER_KEY|" .env
  sed -i.bak "s|AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=|$SECRET_KEY|" .env

  rm -f .env.bak
  echo "[+] .env created with secure values."
else
  echo "[=] .env already exists, keeping it."
fi

# 2. Build & run containers (fresh start removes any old bad volumes)
echo "[+] Building and starting containers..."
docker compose down -v || true
docker compose up -d --build

# 2.1) Optional: wait for backend health (fast fail if something's off)
echo "[+] Waiting for backend health on :6789..."
for i in {1..40}; do
  if curl -sf http://localhost:6789/health >/dev/null 2>&1; then
    echo "[✓] Backend healthy."
    break
  fi
  sleep 1
  if [ "$i" -eq 40 ]; then
    echo "[!] Backend failed to become healthy. Check logs:"
    echo "    docker logs --tail=200 odin-valkyrie-postgres"
    echo "    docker logs --tail=200 odin-valkyrie-backend"
    exit 1
  fi
done

echo "[✓] Valkyrie is up!"
echo "    API:        http://localhost:6789"
echo "    Health:     curl http://localhost:6789/health"
echo "    Example ingest:"
echo "      echo 'hello' > test.txt && \\"
echo "      curl -F project_id=1 -F owner_user_id=2 -F file=@test.txt -H 'X-API-Key: alice-key-123' http://localhost:6789/api/ingest"
