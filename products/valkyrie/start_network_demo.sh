#!/bin/bash

# Valkyrie Network Demo Startup Script
echo "🌐 Starting Valkyrie Network Demo..."

# Get your local IP address
LOCAL_IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | head -1 | awk '{print $2}')
if [ -z "$LOCAL_IP" ]; then
    LOCAL_IP=$(ifconfig en0 | grep "inet " | awk '{print $2}')
fi

echo "📍 Your IP Address: $LOCAL_IP"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop first."
    echo "   Download from: https://www.docker.com/products/docker-desktop/"
    exit 1
fi

# Start PostgreSQL if not running
if ! docker ps | grep -q "postgres"; then
    echo "📦 Starting PostgreSQL container..."
    docker run -d \
        --name valkyrie-postgres \
        -e POSTGRES_DB=valkyrie \
        -e POSTGRES_USER=valkyrie \
        -e POSTGRES_PASSWORD=valkyrie123 \
        -p 5432:5432 \
        postgres:15
    echo "⏳ Waiting for PostgreSQL to start..."
    sleep 10
fi

# Install Python dependencies
echo "📦 Installing Python dependencies..."
cd backend
pip install -r requirements.txt

# Initialize database
echo "🗄️ Initializing database..."
python init_db.py

# Start the FastAPI server in background
echo "🚀 Starting FastAPI server..."
uvicorn app.main:app --host 0.0.0.0 --port 6789 --reload &
BACKEND_PID=$!

# Go back to root and start frontend
cd ../frontend

# Start the frontend in background
echo "🎨 Starting Frontend server..."
npm run dev -- --port 3001 --host 0.0.0.0 &
FRONTEND_PID=$!

# Wait a moment for servers to start
sleep 5

echo ""
echo "✅ Valkyrie Network Demo is running!"
echo ""
echo "🔗 Access URLs:"
echo "   Frontend (You):     http://localhost:3001"
echo "   Frontend (Friend):  http://$LOCAL_IP:3001"
echo "   Backend API:        http://$LOCAL_IP:6789"
echo "   API Documentation:  http://$LOCAL_IP:6789/docs"
echo "   Health Check:       http://$LOCAL_IP:6789/health"
echo ""
echo "📱 Share this URL with your friend:"
echo "   http://$LOCAL_IP:3001"
echo ""
echo "💾 External SSD Storage:"
echo "   User data will be saved to: /Volumes/*/valkyrie_user_data/"
echo "   (Make sure your external SSD is connected)"
echo ""
echo "🛑 To stop the servers, press Ctrl+C"
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Servers stopped"
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Wait for user to stop
wait