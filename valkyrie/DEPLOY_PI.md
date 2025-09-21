# Deploying Valkyrie on a Raspberry Pi (with Tailscale)

This document outlines a pragmatic path to run the Valkyrie prototype on a Raspberry Pi (arm64) and make it reachable via Tailscale.

Summary
- The codebase contains a lightweight prototype (compat router) you can use immediately. For production-like behavior you should run the full stack (Postgres, Redis, optional graph DB, Caddy) via Docker Compose.
- Key differences to watch for on Raspberry Pi:
  - Use arm64-compatible Docker images (some images — notably some Neo4j versions — have limited or no arm64 support).
  - Prefer lightweight alternatives (Redis fallback or Memgraph) if Neo4j is not available for your Pi architecture.
  - Use Tailscale MagicDNS (recommended) to reach the Pi from other machines. Caddy will serve TLS locally if you configure it or you can use Tailscale's built-in HTTPS features.

Prerequisites (on the Pi)
- Raspberry Pi OS (64-bit) or another Linux arm64 distro.
- Docker Engine and Docker Compose plugin (Compose V2):
  - Install Docker: https://docs.docker.com/engine/install/
  - Install Docker Compose plugin: https://docs.docker.com/compose/install/
- Tailscale: https://tailscale.com/kb/1017/install
  - Sign in to your tailnet and set a hostname like `valkyrie` or `valkyrie-pi`.
- (Optional) swap file or extra storage if you plan to host Postgres data on the Pi.

Quick start (recommended for evaluation)
1. SSH into the Pi and install Docker + Tailscale.
2. Configure Tailscale and set the hostname:
   ```bash
   # On the Pi (Linux shell):
   sudo tailscale up --hostname=valkyrie
   ```
   After this, your Pi will be discoverable via your tailnet's MagicDNS (for example `valkyrie.<your-tailnet>.beta.tailscale.net`).

3. Clone the repo on the Pi and copy example env:
   ```bash
   git clone <repo-url> valkyrie
   cd valkyrie
   cp configs/.env.example .env
   # Edit .env to set DATABASE_URL, REDIS_URL, etc. (or keep defaults for quick prototype)
   ```

4. Start the lightweight prototype (no external DB dependencies). This runs the compatibility router used by the current frontend:
   ```bash
   # optional: use a venv
   python -m venv .venv; source .venv/bin/activate
   pip install fastapi uvicorn
   uvicorn apps.api.simple_app:app --host 0.0.0.0 --port 6789 --workers 1
   ```
   - Visit `http://<pi-tailscale-ip>:6789/api/health` to confirm.
   - Run the frontend locally (or build and serve with Caddy) and point it to `http://<pi-tailscale-ip>:6789` via the Vite `VITE_API_URL` env.

Production-ish stack with Docker Compose (recommended)
- Use the provided `docker-compose.pi.yml` (sample in this repo) as an override to the base `docker-compose.yml`. It uses arm64-friendly image tags where possible.

Sample Docker Compose run:
```bash
# from repo root (valkyrie)
docker compose -f docker-compose.yml -f docker-compose.pi.yml up -d --build
```

Notes and caveats
- Neo4j: official Neo4j images historically had limited arm64 support. If Neo4j won't run on your Pi, use Redis-backed graph fallback included in the codebase or consider Memgraph which has arm64 builds.
- Caddy and TLS: the repo includes a `configs/Caddyfile`. With Tailscale you can either:
  - Use MagicDNS and serve the Pi's tailnet hostname (e.g., `valkyrie.<tailnet>`) from Caddy; or
  - Use Tailscale’s `tailscale serve` and/or its HTTPS features (see Tailscale docs). For simplicity, using Caddy + a domain you control is recommended.
- Backups: Postgres on a Pi may be slower — consider backing up volumes and keeping DBs small for testing.
- Performance: Raspberry Pi (especially older models) is resource constrained — tune worker counts, Postgres memory settings, and chunk sizes.

Troubleshooting
- If a service fails to start due to image/platform mismatch, try adding `platform: linux/arm64` to the service in the compose file or switch to an image that supports arm64.
- If the frontend cannot reach the API, confirm Tailscale connectivity and the API URL (use the Pi's tailnet hostname or Tailscale IP in the frontend Vite env).

Recommended immediate actions before deploying
1. Decide whether you need Neo4j on the Pi; if yes, verify an arm64 image or plan to host Neo4j elsewhere.
2. Update `configs/.env.example` with production sensible defaults and copy to `.env` on the Pi.
3. Build a minimal `docker-compose.pi.yml` to pin arm64-friendly images and set resource limits.
