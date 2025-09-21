# 🚀 Valkyrie File Manager - Complete Installation Guide

## 📋 Prerequisites

- **Docker** and **Docker Compose** installed
- **Linux server** (Ubuntu 20.04+ recommended)
- **Minimum 2GB RAM** and **10GB disk space**
- **Ports 3000 and 6789** available

## 🎯 Quick Start (Single Command)

```bash
# Download and extract
wget https://odin-weld-beta.vercel.app/odin-valkyrie-default.zip
unzip odin-valkyrie-default.zip
cd odin-valkyrie-default

# Make executable and run
chmod +x install-complete.sh
./install-complete.sh
```

## 🔧 Manual Installation Steps

### 1. Download the Package
```bash
# Download the complete system
wget https://odin-weld-beta.vercel.app/odin-valkyrie-default.zip

# Extract to your desired location
unzip odin-valkyrie-default.zip
cd odin-valkyrie-default
```

### 2. Install Dependencies
```bash
# Install Docker (Ubuntu/Debian)
sudo apt update
sudo apt install -y docker.io docker-compose

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Add user to docker group (optional)
sudo usermod -aG docker $USER
```

### 3. Configure Environment
```bash
# Copy environment template
cp env.example .env

# Edit configuration (optional)
nano .env
```

### 4. Run Installation
```bash
# Make scripts executable
chmod +x install-complete.sh install.sh

# Run complete installation
./install-complete.sh
```

## 🌐 Access Information

After installation, access your file manager:

- **Web Interface**: http://your-server-ip:3000
- **API Endpoint**: http://your-server-ip:6789
- **API Documentation**: http://your-server-ip:6789/docs
- **Health Check**: http://your-server-ip:6789/health

## 🔐 Default Login Credentials

### API Keys (for programmatic access)
- **CEO**: `ceo-key-123` (full system access)
- **Editor**: `alice-key-123` (project-specific access)
- **Intern**: `intern-key-123` (limited access)

### Web Interface Login
- **Username**: admin
- **Password**: admin123

⚠️ **IMPORTANT**: Change default credentials after first login!

## 📁 File Upload Testing

### Using Web Interface
1. Open http://your-server-ip:3000
2. Login with admin/admin123
3. Click "Upload Files" button
4. Select files and choose project
5. Files are automatically encrypted and stored

### Using API (cURL)
```bash
# Upload a file using API
curl -X POST \
  -H "x-api-key: ceo-key-123" \
  -F "project_id=1" \
  -F "owner_user_id=1" \
  -F "upload=@/path/to/your/file.txt" \
  http://your-server-ip:6789/api/ingest

# List uploaded files
curl -H "x-api-key: ceo-key-123" \
  http://your-server-ip:6789/api/list

# Download a file
curl -H "x-api-key: ceo-key-123" \
  http://your-server-ip:6789/api/download/1
```

## 🔧 Customizing API Keys

### 1. Edit User Configuration
```bash
# Edit the backend configuration
nano backend/app/main.py
```

### 2. Modify User Creation (lines 28-34)
```python
con.execute(text("""
    INSERT INTO users (name, api_key, role)
    VALUES (:n, :k, :r)
    ON CONFLICT (api_key) DO NOTHING
"""), [
    {"n":"YourName","k":"your-custom-key-123","r":"ceo"},
    {"n":"TeamMember1","k":"team1-key-456","r":"editor"},
    {"n":"TeamMember2","k":"team2-key-789","r":"intern"}
])
```

### 3. Restart Services
```bash
docker-compose restart backend
```

## 🏗️ System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (React)       │◄──►│   (FastAPI)     │◄──►│   (PostgreSQL)  │
│   Port: 3000    │    │   Port: 6789    │    │   Port: 5432    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌─────────────────┐
│   File Storage  │    │   Encryption    │
│   (Encrypted)   │    │   (AES-256)     │
└─────────────────┘    └─────────────────┘
```

## 🔒 Security Features

- **End-to-End Encryption**: All files encrypted with AES-256-GCM
- **API Key Authentication**: Secure access control
- **Project-Based Access**: Users can only access assigned projects
- **Role-Based Permissions**: CEO > Editor > Intern
- **Local Storage**: No cloud dependency, complete data control

## 🛠️ Management Commands

### Start Services
```bash
docker-compose up -d
```

### Stop Services
```bash
docker-compose down
```

### View Logs
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs backend
docker-compose logs frontend
docker-compose logs database
```

### Backup Data
```bash
# Backup database
docker-compose exec database pg_dump -U valkyrie valkyrie_db > backup.sql

# Backup files
tar -czf files-backup.tar.gz data/files/
```

### Restore Data
```bash
# Restore database
docker-compose exec -T database psql -U valkyrie valkyrie_db < backup.sql

# Restore files
tar -xzf files-backup.tar.gz
```

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Check what's using the ports
sudo netstat -tulpn | grep :3000
sudo netstat -tulpn | grep :6789

# Kill processes if needed
sudo kill -9 <PID>
```

### Permission Issues
```bash
# Fix file permissions
sudo chown -R $USER:$USER .
chmod -R 755 .
```

### Database Connection Issues
```bash
# Check database status
docker-compose logs database

# Restart database
docker-compose restart database
```

### Frontend Not Loading
```bash
# Check frontend logs
docker-compose logs frontend

# Rebuild frontend
docker-compose up --build frontend
```

## 📊 Monitoring

### Health Checks
```bash
# Check all services
curl http://localhost:6789/health

# Check specific service
docker-compose ps
```

### Resource Usage
```bash
# Check Docker resource usage
docker stats

# Check disk usage
df -h
du -sh data/
```

## 🔄 Updates

### Update System
```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose up --build -d
```

## 📞 Support

For technical support:
- Check logs: `docker-compose logs`
- Health check: `curl http://localhost:6789/health`
- API docs: `http://localhost:6789/docs`

---

**Valkyrie File Manager** - Secure, Local File Management System
