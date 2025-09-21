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
  # Deploying Valkyrie when only the `valkyrie/` folder will be on the server

  This document describes how to deploy Valkyrie when you will only copy the `valkyrie/` folder to a Linux server (Raspberry Pi or similar). All paths and commands below assume you are operating from inside that single `valkyrie/` directory on the server.

  Goals
  - Make the repository self-contained so you can transfer only `valkyrie/` to a server and run the stack from that folder.
  - Provide a simple installer (`valkyrie/install.sh`) and systemd unit templates (`valkyrie/systemd/`) that reference the local folder.

  Prerequisites on the server
  - Linux (Debian/Ubuntu/Raspbian recommended)
  - Docker Engine installed and running
  - Docker Compose (v2 via `docker compose` or legacy `docker-compose`)

  Copying the folder to the server
  1. From your workstation, copy the `valkyrie/` folder to the server home directory. Example using `scp`:

  ```bash
  scp -r valkyrie user@raspi:/home/user/
  ```

  2. SSH into the server and change to the `valkyrie/` folder:

  ```bash
  ssh user@raspi
  cd ~/valkyrie
  ```

  Installer (single-folder)
  - A self-contained installer is provided at `valkyrie/install.sh`. It must be executed while your current working directory is the `valkyrie/` folder. It will:
    - Verify `docker` and `docker compose` (or `docker-compose`) are available and that the Docker daemon is running.
    - Copy `env.docker` to `.env` if `.env` is missing.
    - Create expected volume folders: `data`, `database/local`, and `valkyrie_data`.
  - Launch Docker Compose using the local compose file `docker-compose.yml` in the current directory (or `configs/docker-compose.yml` if you keep compose files in `configs/`).

  Run the installer (on the server):

  ```bash
  cd ~/valkyrie
  chmod +x ./install.sh
  ./install.sh
  ```

  PowerShell/Windows note
  - If you must run from PowerShell (e.g., on a Windows server with WSL), use `valkyrie/install.ps1`. It will prefer to call `install.sh` inside WSL if available; otherwise it runs compose from PowerShell.

  Systemd templates (single-folder friendly)
  - Two example units are included in `valkyrie/systemd/`:
    - `valkyrie-api.service` — starts/stops the whole compose stack (copy to `/etc/systemd/system/valkyrie-api.service`)
    - `valkyrie-worker.service` — manages just the worker container (copy to `/etc/systemd/system/valkyrie-worker.service`)

  Install and enable the API service (example):

  ```bash
  # on the server, from your home folder (assuming valkyrie is at ~/valkyrie)
  sudo cp ~/valkyrie/systemd/valkyrie-api.service /etc/systemd/system/valkyrie-api.service
  sudo systemctl daemon-reload
  sudo systemctl enable --now valkyrie-api.service

  # Optional: enable the worker unit
  sudo cp ~/valkyrie/systemd/valkyrie-worker.service /etc/systemd/system/valkyrie-worker.service
  sudo systemctl enable --now valkyrie-worker.service
  ```

  Notes and troubleshooting
  - If the compose command fails because of image platform mismatch, add `platform: linux/arm64` in your `docker-compose.yml` or switch to arm64-compatible images.
  - Check container status and logs with:

  ```bash
  docker compose ps
  docker compose logs -f
  ```

  - If the server is memory constrained, consider disabling non-critical services or using lighter images in `docker-compose.yml`.

  Networking and hostname
  - If you want `valkyrie.local` or another friendly name to resolve to the server, update your DNS or `/etc/hosts` on client machines, or use a Tailscale hostname (recommended for simple remote access without public DNS).

  Next steps (optional)
  - Convert the prototype storage to SQLite to avoid running Postgres on the Pi.
  - Harden secrets and move sensitive environment variables to a secrets store or the host environment.

  If you want, I can now:
  - Make `docker-compose.yml` smaller (disable Caddy or Postgres) for a minimal Pi-friendly demo, or
  - Implement an automatic SQLite migration that runs after containers start.
