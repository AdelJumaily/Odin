<#
.SYNOPSIS
  Install and start Valkyrie on Raspberry Pi (or local) using Docker Compose with Pi override.

DESCRIPTION
  This script performs lightweight checks (Docker present, compose available), copies `env.docker` to `.env` if missing,
  ensures data directories exist, and runs the Docker Compose command:
    docker compose -f docker-compose.yml -f docker-compose.pi.yml up -d --build

  If WSL is available and `bash` exists, it prefers calling `install.sh` to keep behavior consistent across platforms.
#>

param()

Set-StrictMode -Version Latest

$root = Split-Path -Path $PSScriptRoot -Parent
Write-Host "Valkyrie Pi install helper (PowerShell)" -ForegroundColor Cyan

# prefer WSL bash script if available
try {
    & wsl -e bash -lc "exit 0" 2>$null
    $wslOk = $true
} catch {
    $wslOk = $false
}

if ($wslOk -and (Test-Path "$root/install.sh")) {
    Write-Host "WSL detected — running install.sh inside WSL for consistent behavior"
    & wsl -e bash -lc "cd /mnt/$(($root -replace ':','' ) -replace '\\','/'); ./install.sh"
    exit $LASTEXITCODE
}

# Check Docker
try { docker version | Out-Null } catch { Write-Error "Docker is not available. Install Docker Desktop or Docker Engine."; exit 1 }

# Check docker compose
try {
    docker compose version | Out-Null
} catch {
    try {
        docker-compose version | Out-Null
    } catch { Write-Error "Docker Compose not available. Install Compose V2 or docker-compose."; exit 1 }
}

if (-not (Test-Path "$root/.env") -and (Test-Path "$root/env.docker")) {
    Write-Host "Copying env.docker to .env"
    Copy-Item "$root/env.docker" "$root/.env" -Force
}

Write-Host "Ensuring data directories exist"
New-Item -ItemType Directory -Path "$root\valkyrie\data" -Force | Out-Null
New-Item -ItemType Directory -Path "$root\database\local" -Force | Out-Null
New-Item -ItemType Directory -Path "$root\data" -Force | Out-Null

Write-Host "Running docker compose with Pi override"

# Determine compose file locations (root or configs)
$composeFiles = @()
if (Test-Path (Join-Path $root 'docker-compose.yml') -and Test-Path (Join-Path $root 'docker-compose.pi.yml')) {
    $composeFiles = @(Join-Path $root 'docker-compose.yml', Join-Path $root 'docker-compose.pi.yml')
} elseif (Test-Path (Join-Path $root 'configs\docker-compose.yml') -and Test-Path (Join-Path $root 'configs\docker-compose.pi.yml')) {
    $composeFiles = @(Join-Path $root 'configs\docker-compose.yml', Join-Path $root 'configs\docker-compose.pi.yml')
} else {
    Write-Error "Could not find docker-compose.yml and docker-compose.pi.yml in root or configs/"; exit 1
}

& docker compose -f $composeFiles[0] -f $composeFiles[1] up -d --build

Write-Host "Docker Compose launched. Use 'docker compose ps' to check containers."
