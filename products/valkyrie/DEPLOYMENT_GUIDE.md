# Valkyrie Docker Deployment Guide

This guide covers deploying the Valkyrie application on Linux servers using Docker and Docker Compose.

## 🚀 Quick Start

### 1. Prerequisites

**On your Linux server:**
- Docker Engine (version 20.10+)
- Docker Compose (version 2.0+)
- At least 2GB RAM
- 10GB free disk space

**Install Docker on Ubuntu/Debian:**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
# Log out and back in
```

**Install Docker on CentOS/RHEL:**
```bash
sudo yum install -y docker
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER
```

### 2. Deploy the Application

**Copy to server:**
```bash
# From your local machine
scp -r valkyrie user@your-server:/home/user/
```

**SSH and setup:**
```bash
ssh user@your-server
cd ~/valkyrie

# Make installer executable
chmod +x ./install.sh

# Run the installer
./install.sh
```

### 3. Access the Application

- **Frontend**: http://your-server:3000
- **API**: http://your-server:8000
- **Neo4j Browser**: http://your-server:7474
- **Mailpit**: http://your-server:8025

## 🔧 Configuration

### Environment Variables

The installer creates a `.env` file from `env.docker`. For production:

```bash
# Copy production template
cp env.production .env

# Edit for your needs
nano .env
```

**Key settings to change:**
- `VALKYRIE_SECRET_KEY` - Generate a secure random key
- `VALKYRIE_DEV_MODE=false` - Disable development mode
- Port numbers if they conflict with existing services

### Port Configuration

Default ports (change in `.env` if needed):
- **Frontend**: 3000
- **API**: 8000
- **PostgreSQL**: 5432
- **Redis**: 6379
- **Neo4j**: 7474 (HTTP), 7687 (Bolt)
- **Mailpit**: 8025 (HTTP), 1025 (SMTP)
- **Caddy**: 80 (HTTP), 443 (HTTPS)

## 🐳 Docker Services

### Core Services
- **postgres**: PostgreSQL database
- **redis**: Redis cache and job queue
- **neo4j**: Graph database
- **api**: FastAPI backend server
- **frontend**: React frontend (Nginx)
- **worker**: Background task processor

### Optional Services
- **mailpit**: Email testing (development)
- **caddy**: Reverse proxy with HTTPS

## 🚀 Production Deployment

### 1. Systemd Services (Auto-start)

**Install systemd services:**
```bash
# Copy service files
sudo cp systemd/valkyrie-api.service /etc/systemd/system/
sudo cp systemd/valkyrie-worker.service /etc/systemd/system/

# Reload systemd
sudo systemctl daemon-reload

# Enable and start services
sudo systemctl enable --now valkyrie-api.service
sudo systemctl enable --now valkyrie-worker.service
```

**Check status:**
```bash
sudo systemctl status valkyrie-api.service
sudo systemctl status valkyrie-worker.service
```

### 2. HTTPS with Caddy

The included Caddyfile provides automatic HTTPS. Update `configs/Caddyfile`:

```caddyfile
your-domain.com {
    reverse_proxy frontend:80
    reverse_proxy /api/* api:8000
}
```

### 3. Security Hardening

**Change default passwords:**
```bash
# Edit .env file
nano .env

# Change these values:
VALKYRIE_SECRET_KEY=your-very-secure-random-key-here
VALKYRIE_NEO4J_PASSWORD=your-secure-neo4j-password
```

**Firewall (UFW example):**
```bash
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw enable
```

## 📊 Monitoring

### Check Service Status
```bash
# All services
docker compose ps

# Service logs
docker compose logs -f api
docker compose logs -f frontend
docker compose logs -f postgres
```

### Resource Usage
```bash
# Container stats
docker stats

# Disk usage
docker system df
```

## 🔄 Updates

### Update Application
```bash
# Pull latest changes
git pull

# Rebuild and restart
docker compose down
docker compose up --build -d
```

### Backup Data
```bash
# Backup database
docker compose exec postgres pg_dump -U valkyrie valkyrie > backup.sql

# Backup volumes
docker run --rm -v valkyrie_postgres_data:/data -v $(pwd):/backup alpine tar czf /backup/postgres-backup.tar.gz -C /data .
```

## 🐛 Troubleshooting

### Common Issues

**Port conflicts:**
```bash
# Check what's using a port
sudo netstat -tulpn | grep :3000

# Change port in .env
nano .env
```

**Permission issues:**
```bash
# Fix Docker permissions
sudo chown -R $USER:$USER ~/valkyrie
sudo chmod -R 755 ~/valkyrie
```

**Out of memory:**
```bash
# Check memory usage
free -h
docker stats

# Reduce services in docker-compose.yml
# Comment out non-essential services
```

### Logs and Debugging

**View all logs:**
```bash
docker compose logs -f
```

**View specific service logs:**
```bash
docker compose logs -f api
docker compose logs -f frontend
```

**Debug container:**
```bash
# Enter container
docker compose exec api bash

# Check database connection
docker compose exec postgres psql -U valkyrie -d valkyrie
```

## 🎯 Raspberry Pi Specific

### ARM64 Compatibility
The application is tested on Raspberry Pi 4 with ARM64. Some considerations:

**Memory optimization:**
```bash
# Add swap file
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

**Disable heavy services:**
```bash
# Comment out in docker-compose.yml
# - neo4j (if not needed)
# - mailpit (if not needed)
```

### Performance Tips
- Use SSD storage for better database performance
- Allocate at least 2GB RAM to Docker
- Consider using external database for production

## 📝 Next Steps

1. **Configure domain name** and update Caddyfile
2. **Set up SSL certificates** (automatic with Caddy)
3. **Configure monitoring** (Prometheus, Grafana)
4. **Set up backups** (automated database backups)
5. **Security audit** (firewall, access controls)

## 🆘 Support

If you encounter issues:
1. Check the logs: `docker compose logs -f`
2. Verify all services are running: `docker compose ps`
3. Check resource usage: `docker stats`
4. Review this guide and the main README.md
