@echo off
REM Odin Valkyrie File Manager Installation Script for Windows
REM Organization: default
REM Generated: 2025-09-21T02:21:11.456Z

echo 🚀 Starting Odin Valkyrie File Manager Installation...
echo Organization: default
echo.

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not installed. Please install Docker Desktop first.
    echo Visit: https://docs.docker.com/desktop/windows/install/
    pause
    exit /b 1
)

docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker Compose is not installed. Please install Docker Compose first.
    echo Visit: https://docs.docker.com/compose/install/
    pause
    exit /b 1
)

echo ✅ Docker and Docker Compose are installed

REM Run the installation
echo 🔧 Running installation script...
call install-complete.bat

echo.
echo 🎉 Installation Complete!
echo.
echo 📍 Access Information:
echo • Web Interface: http://localhost:3000
echo • API Endpoint: http://localhost:6789
echo • Health Check: http://localhost:6789/health
echo.
echo 🔐 Default Login:
echo • Username: admin
echo • Password: admin123
echo.
echo ⚠️  Please change the default password after first login!
echo.
echo For support, contact your Odin administrator.
pause
