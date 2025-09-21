#!/bin/bash

# Odin Valkyrie File Manager Installation Script
# Organization: default
# Generated: 2025-09-21T02:21:11.455Z

set -e

echo "🚀 Starting Odin Valkyrie File Manager Installation..."
echo "Organization: default"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    echo "Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    echo "Visit: https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"

# Make install script executable
chmod +x install-complete.sh

# Run the installation
echo "🔧 Running installation script..."
./install-complete.sh

echo ""
echo "🎉 Installation Complete!"
echo ""
echo "📍 Access Information:"
echo "• Web Interface: http://localhost:3000"
echo "• API Endpoint: http://localhost:6789"
echo "• Health Check: http://localhost:6789/health"
echo ""
echo "🔐 Default Login:"
echo "• Username: admin"
echo "• Password: admin123"
echo ""
echo "⚠️  Please change the default password after first login!"
echo ""
echo "For support, contact your Odin administrator."
