#!/usr/bin/env bash
set -euo pipefail

echo "[ODIN • Valkyrie] Install script starting..."
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# 1) .env bootstrap
if [[ ! -f .env ]]; then
  echo "[+] Creating .env from .env.example..."
  cp .env.example .env

  echo "[+] Generating random API keys and AES secret..."
  # safe randoms
  CEO_KEY=$(tr -dc 'A-Za-z0-9' </dev/urandom | head -c 20)
  ALICE_KEY=$(tr -dc 'A-Za-z0-9' </dev/urandom | head -c 20)
  INTERN_KEY=$(tr -dc 'A-Za-z0-9' </dev/urandom | head -c 20)
  AES_SECRET=$(openssl rand -base64 32)

  # in-place replace
  sed -i.bak \
    -e "s/^CEO_API_KEY=.*/CEO_API_KEY=${CEO_KEY}/" \
    -e "s/^ALICE_API_KEY=.*/ALICE_API_KEY=${ALICE_KEY}/" \
    -e "s/^INTERN_API_KEY=.*/INTERN_API_KEY=${INTERN_KEY}/" \
    -e "s|^AES_SECRET=.*|AES_SECRET=${AES_SECRET}|" \
    .env
  rm -f .env.bak
  echo "[+] .env created with secure values."
else
  echo "[=] .env already exists; keeping it."
fi

# 2) Ensure runtime dirs exist and are writable for backend
echo "[+] Preparing local ./files dir for blob storage…"
mkdir -p ./files
# permissive while hacking; tighten later if you want (e.g., 770 + chown)
chmod 777 ./files || true

# 3) (Optional) Ensure the override exists (named volume for PG)
if [[ ! -f docker-compose.override.yml ]]; then
  cat > docker-compose.override.yml <<'YAML'
services:
  postgres:
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata: {}
YAML
  echo "[+] Wrote docker-compose.override.yml with named volume for Postgres."
else
  echo "[=] docker-compose.override.yml present."
fi

# 4) Build & up
echo "[+] Building and starting containers..."
docker compose down -v || true
docker compose up -d --build

# 5) Wait for backend health
echo "[+] Waiting for backend health on :6789..."
TRIES=40
until curl -sf http://localhost:6789/health >/dev/null 2>&1; do
  ((TRIES--)) || { echo "[!] Backend failed to become healthy"; exit 1; }
  sleep 1
done
echo "[✓] Backend healthy."

# 6) (Once) enable pgcrypto if you use SQL-side SHA512
echo "[+] Ensuring pgcrypto extension (harmless if already there)…"
docker exec -i odin-valkyrie-postgres psql -U valkyrie -d valkyrie \
  -c "CREATE EXTENSION IF NOT EXISTS pgcrypto;" >/dev/null 2>&1 || true

echo "[✓] Install complete. Try: curl -s http://localhost:6789/health"
