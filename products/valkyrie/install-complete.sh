#!/usr/bin/env bash
set -e

echo "🚀 [ODIN • Valkyrie] Complete Installation Script"
echo "=================================================="

# Ensure we're in the project root
cd "$(dirname "$0")"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version 16+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# 1. Install backend dependencies and setup
echo ""
echo "📦 Setting up backend..."
cd backend
if [ ! -f requirements.txt ]; then
    echo "❌ Backend requirements.txt not found"
    exit 1
fi

# Create virtual environment for Python
if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi

echo "Activating virtual environment and installing dependencies..."
source venv/bin/activate
pip install -r requirements.txt

cd ..

# 2. Install frontend dependencies
echo ""
echo "🎨 Setting up frontend..."
cd frontend

if [ ! -f package.json ]; then
    echo "❌ Frontend package.json not found"
    exit 1
fi

echo "Installing frontend dependencies..."
npm install

# Create environment file
if [ ! -f ".env" ]; then
    echo "Creating frontend environment configuration..."
    cp env.example .env
fi

cd ..

# 3. Setup Docker environment
echo ""
echo "🐳 Setting up Docker environment..."

# Create .env file for Docker if it doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating Docker environment configuration..."
    cat > .env << EOF
# Database Configuration
POSTGRES_DB=odin_valkyrie
POSTGRES_USER=odin_user
POSTGRES_PASSWORD=$(openssl rand -hex 16)

# API Keys
ODIN_ADMIN_KEY=$(openssl rand -hex 16)
ODIN_READER_KEY=$(openssl rand -hex 16)

# Encryption
ODIN_SECRET_KEY=$(openssl rand -base64 32)

# Files Directory
FILES_DIR=/files

# Database URL
DATABASE_URL=postgresql://odin_user:$(grep POSTGRES_PASSWORD .env | cut -d'=' -f2)@postgres:5432/odin_valkyrie
EOF
    echo "✅ Generated secure environment configuration"
fi

# Create files directory
mkdir -p ./files
chmod 777 ./files

# 4. Build frontend
echo ""
echo "🔨 Building frontend..."
cd frontend
npm run build
cd ..

# 5. Start services
echo ""
echo "🚀 Starting services..."

# Stop any existing containers
docker compose down -v 2>/dev/null || true

# Start the services
docker compose up -d --build

# Wait for backend to be healthy
echo "⏳ Waiting for backend to be ready..."
for i in {1..60}; do
    if curl -sf http://localhost:8000/health >/dev/null 2>&1; then
        echo "✅ Backend is healthy"
        break
    fi
    sleep 2
    if [ "$i" -eq 60 ]; then
        echo "❌ Backend failed to start. Check logs:"
        echo "   docker logs odin-valkyrie-backend"
        echo "   docker logs odin-valkyrie-postgres"
        exit 1
    fi
done

# 6. Serve frontend (simple Python server for now)
echo ""
echo "🌐 Starting frontend server..."
cd frontend/dist

# Start a simple HTTP server in the background
python3 -m http.server 3000 > /dev/null 2>&1 &
FRONTEND_PID=$!

# Wait a moment for the server to start
sleep 2

cd ../..

echo ""
echo "🎉 Installation Complete!"
echo "========================"
echo ""
echo "📊 Services Status:"
echo "   Backend API:    http://localhost:8000"
echo "   Frontend UI:    http://localhost:3000"
echo "   Health Check:   curl http://localhost:8000/health"
echo ""
echo "🔑 Sample API Keys:"
echo "   CEO:     ceo-key-123"
echo "   Editor:  alice-key-123" 
echo "   Intern:  intern-key-123"
echo ""
echo "📁 File Storage:"
echo "   Encrypted files are stored in: ./files/"
echo ""
echo "🛠️  Management Commands:"
echo "   Stop services:    docker compose down"
echo "   View logs:        docker compose logs -f"
echo "   Restart:          docker compose restart"
echo ""
echo "🌐 Access the application at: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop all services"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping services..."
    kill $FRONTEND_PID 2>/dev/null || true
    docker compose down
    echo "✅ All services stopped"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Keep the script running
wait
