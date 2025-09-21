#!/bin/bash

# Valkyrie Setup Script for Raspberry Pi
# This script sets up PostgreSQL and the Valkyrie system on a Raspberry Pi

set -e

echo "🚀 Setting up Valkyrie on Raspberry Pi..."

# Update system
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Docker and Docker Compose
echo "🐳 Installing Docker..."
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
echo "🔧 Installing Docker Compose..."
sudo apt install -y docker-compose

# Install PostgreSQL client tools
echo "🗄️ Installing PostgreSQL client..."
sudo apt install -y postgresql-client

# Create directories
echo "📁 Creating directories..."
mkdir -p ./files
mkdir -p ./logs

# Set up environment variables
echo "⚙️ Setting up environment..."
cat > .env << EOF
# Database
POSTGRES_PASSWORD=$(openssl rand -base64 32)

# Security
ODIN_SECRET_KEY=$(openssl rand -base64 32)

# File Storage
FILES_DIR=/app/files
EOF

echo "🔐 Generated secure passwords and keys in .env file"

# Set permissions
echo "🔒 Setting permissions..."
chmod 600 .env
chmod 755 ./files

# Start services
echo "🚀 Starting Valkyrie services..."
docker-compose -f docker-compose.prod.yml up -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 30

# Check if services are running
echo "🔍 Checking service status..."
docker-compose -f docker-compose.prod.yml ps

# Test database connection
echo "🧪 Testing database connection..."
docker-compose -f docker-compose.prod.yml exec postgres psql -U valkyrie -d valkyrie -c "SELECT version();"

echo ""
echo "✅ Valkyrie setup complete!"
echo ""
echo "📍 Access Information:"
echo "• Web Interface: http://$(hostname -I | awk '{print $1}'):3000"
echo "• API Endpoint: http://$(hostname -I | awk '{print $1}'):6789"
echo "• API Documentation: http://$(hostname -I | awk '{print $1}'):6789/docs"
echo ""
echo "🔑 Default Login:"
echo "• Go to the web interface and sign up with your organization details"
echo "• The system will create your organization and generate API keys"
echo ""
echo "📋 Management Commands:"
echo "• View logs: docker-compose -f docker-compose.prod.yml logs"
echo "• Stop services: docker-compose -f docker-compose.prod.yml down"
echo "• Start services: docker-compose -f docker-compose.prod.yml up -d"
echo "• Restart services: docker-compose -f docker-compose.prod.yml restart"
echo ""
echo "🔐 Security Notes:"
echo "• Change default passwords after first login"
echo "• Keep your .env file secure and never share it"
echo "• Regularly backup your PostgreSQL data"
echo ""
echo "For support, contact your Odin administrator."
