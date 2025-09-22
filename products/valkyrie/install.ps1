<#
valkyrie\install.ps1
PowerShell helper to run the valkyrie installer from inside the valkyrie folder.
If WSL is available it will call the bundled install.sh inside WSL to keep behavior consistent.
#>
param()

Set-StrictMode -Version Latest
$root = Split-Path -Path $PSScriptRoot -Parent
Write-Host "Valkyrie installer (valkyrie\install.ps1) — running from $root"

# prefer WSL bash script if available
try { & wsl -e bash -lc "exit 0" 2>$null; $wslOk = $true } catch { $wslOk = $false }

if ($wslOk -and (Test-Path "$PSScriptRoot\install.sh")) {
    Write-Host "WSL detected — running install.sh inside WSL"
    & wsl -e bash -lc "cd /mnt/$(($PSScriptRoot -replace ':','' ) -replace '\\','/'); ./install.sh"
    exit $LASTEXITCODE
}

try { docker version | Out-Null } catch { Write-Error "Docker is not available."; exit 1 }

try { docker compose version | Out-Null } catch { try { docker-compose version | Out-Null } catch { Write-Error "Docker Compose not available."; exit 1 } }

if (-not (Test-Path "$PSScriptRoot\.env") -and (Test-Path "$PSScriptRoot\env.docker")) {
    Copy-Item "$PSScriptRoot\env.docker" "$PSScriptRoot\.env" -Force
}

New-Item -ItemType Directory -Path (Join-Path $PSScriptRoot 'data') -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $PSScriptRoot 'database\local') -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $PSScriptRoot 'valkyrie_data') -Force | Out-Null

# Determine compose files
if (Test-Path (Join-Path $PSScriptRoot 'docker-compose.yml')) {
    $composeA = @(Join-Path $PSScriptRoot 'docker-compose.yml')
} elseif (Test-Path (Join-Path $PSScriptRoot 'configs\docker-compose.yml')) {
    $composeA = @(Join-Path $PSScriptRoot 'configs\docker-compose.yml')
} else {
    Write-Error "Could not find docker-compose.yml in this folder or configs/"; exit 1
}

& docker compose -f $composeA[0] up -d --build

Write-Host "Docker Compose started. Use 'docker compose ps' to inspect containers."
