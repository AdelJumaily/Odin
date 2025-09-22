#!/bin/bash

# Valkyrie Backend Startup Script
echo "🚀 Starting Valkyrie Backend..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop first."
    echo "   Download from: https://www.docker.com/products/docker-desktop/"
    exit 1
fi

# Check if PostgreSQL container is running
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

# Start the FastAPI server
echo "🚀 Starting FastAPI server..."
uvicorn app.main:app --host 0.0.0.0 --port 6789 --reload

echo "✅ Valkyrie Backend is running!"
echo "   API: http://localhost:6789"
echo "   Docs: http://localhost:6789/docs"
echo "   Health: http://localhost:6789/health"
