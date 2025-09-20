#!/usr/bin/env bash
set -e

echo "[ODIN • Valkyrie] Install script starting..."

# Ensure we're in the project root
cd "$(dirname "$0")"

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

# 2. Build & run containers
echo "[+] Building and starting containers..."
docker compose up -d --build

echo "[✓] Valkyrie is up!"
echo "    API should be live at: http://localhost:6789"
echo "    Health check: curl http://localhost:6789/health"
