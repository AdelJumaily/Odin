#!/bin/bash

# Deploy Odin Desktop Application with Docker
# This script builds and runs the desktop application in Docker

set -e

echo "🐳 Building Odin Desktop Application with Docker..."

# Build the Docker image
echo "🔨 Building Docker image..."
docker build -t odin-desktop:latest .

# Stop and remove existing container if it exists
echo "🧹 Cleaning up existing container..."
docker stop odin-desktop 2>/dev/null || true
docker rm odin-desktop 2>/dev/null || true

# Run the container
echo "🚀 Starting Odin Desktop Application..."
docker run -d \
  --name odin-desktop \
  --restart unless-stopped \
  -p 3000:3000 \
  -v odin_data:/app/data \
  -v odin_config:/app/config \
  odin-desktop:latest

# Wait for the application to start
echo "⏳ Waiting for application to start..."
sleep 10

# Check if the application is running
if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
    echo "✅ Odin Desktop Application is running!"
    echo "🌐 Access the application at: http://localhost:3000"
    echo "📊 Health check: http://localhost:3000/api/health"
else
    echo "❌ Application failed to start. Check logs:"
    docker logs odin-desktop
    exit 1
fi

echo ""
echo "📋 Useful commands:"
echo "  View logs: docker logs odin-desktop"
echo "  Stop app:  docker stop odin-desktop"
echo "  Start app: docker start odin-desktop"
echo "  Remove app: docker rm -f odin-desktop"
