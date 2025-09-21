# 🏢 Odin Valkyrie - Enterprise File Management System

A complete, self-hosted file management solution designed for enterprise environments. Valkyrie provides secure, encrypted file storage with role-based access control, running entirely within your company's infrastructure.

## 🌟 Features

### 🔐 Security & Encryption
- **End-to-End Encryption**: All files encrypted with AES-GCM before storage
- **Role-Based Access Control**: CEO, Admin, Editor, Viewer, Intern roles
- **API Key Authentication**: Secure access without passwords
- **Local Infrastructure**: No external cloud dependencies
- **File Integrity**: SHA-512 hashing for data verification

### 📁 File Management
- **Drag & Drop Upload**: Modern file upload interface
- **Project Organization**: Group files by projects and teams
- **Advanced Search**: Full-text search across filenames and content
- **File Preview**: Support for images, documents, and more
- **Bulk Operations**: Upload, download, and manage multiple files

### 🔍 Discovery & Search
- **Text Search**: Search across file names and content
- **Entity Search**: Find files by type, tags, or metadata
- **Connected Documents**: Discover related files
- **Advanced Filtering**: Filter by size, date, type, and more

### 👥 User Management
- **Multi-User Support**: Team collaboration features
- **Project Membership**: Control access to specific projects
- **Role Hierarchy**: Granular permission system
- **User Activity**: Track file access and modifications

## 🏗️ Architecture

### Backend (FastAPI + PostgreSQL)
- **FastAPI**: Modern Python web framework
- **PostgreSQL**: Robust database with full-text search
- **Docker**: Containerized deployment
- **RESTful API**: Clean, documented endpoints

### Frontend (React + Vite)
- **React 18**: Modern UI framework
- **Tailwind CSS**: Utility-first styling
- **Vite**: Fast build tool and dev server
- **Responsive Design**: Works on all devices

### Infrastructure
- **Docker Compose**: Easy deployment and scaling
- **Volume Management**: Persistent data storage
- **Health Monitoring**: Built-in health checks
- **Environment Configuration**: Secure key management

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 16+ (for development)
- Python 3.8+ (for development)

### One-Command Installation

```bash
# Clone and run the complete installation
git clone <repository-url>
cd valkyrie
chmod +x install-complete.sh
./install-complete.sh
```

This will:
1. ✅ Install all dependencies
2. ✅ Build the frontend
3. ✅ Start the backend services
4. ✅ Launch the web interface
5. ✅ Generate secure API keys

### Access the System
- **Web Interface**: http://localhost:3000
- **API Endpoint**: http://localhost:6789
- **Health Check**: http://localhost:6789/health

## 🔑 Default API Keys

For initial setup, use these sample API keys:

| Role | API Key | Permissions |
|------|---------|-------------|
| CEO | `ceo-key-123` | Full access to all files and projects |
| Editor | `alice-key-123` | Upload, download, and manage files |
| Intern | `intern-key-123` | Limited access to assigned projects |

## 📡 API Documentation

### Authentication
All API requests require an `X-API-Key` header with a valid API key.

### Core Endpoints

#### File Management
```bash
# Upload a file
POST /api/ingest
Content-Type: multipart/form-data
X-API-Key: your-api-key

# Download a file
GET /api/download/{doc_id}
X-API-Key: your-api-key

# List files
GET /api/list?project_id=1
X-API-Key: your-api-key
```

#### Search
```bash
# Text search
GET /api/search/text?q=search-term
X-API-Key: your-api-key

# Entity search
GET /api/search/entity?type=EXT&value=pdf
X-API-Key: your-api-key

# Connected documents
GET /api/search/connected?from_type=DOC&from_id=1&rel=related
X-API-Key: your-api-key
```

#### System
```bash
# Health check
GET /health
```

## 🛠️ Development

### Backend Development
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 6789
```

### Frontend Development
```bash
cd frontend
npm install
npm run dev
```

### Full Stack Development
```bash
# Terminal 1: Backend
cd backend && uvicorn app.main:app --reload --port 6789

# Terminal 2: Frontend
cd frontend && npm run dev

# Terminal 3: Database
docker run -d -p 5432:5432 -e POSTGRES_DB=odin_valkyrie postgres:16-alpine
```

## 🐳 Docker Deployment

### Production Deployment
```bash
# Build and start all services
docker compose up -d --build

# View logs
docker compose logs -f

# Stop services
docker compose down
```

### Custom Configuration
Edit `docker-compose.yml` to customize:
- Port mappings
- Volume mounts
- Environment variables
- Resource limits

## 📊 Database Schema

### Core Tables
- `users` - User accounts and roles
- `projects` - File organization containers
- `documents` - Encrypted file metadata
- `project_membership` - User-project relationships
- `relationships` - Knowledge graph edges
- `doc_entities` - Extracted entities and tags

### Advanced Features
- Full-text search indexes
- Knowledge graph relationships
- Entity extraction and tagging
- Audit trails and logging

## 🔧 Configuration

### Environment Variables
```bash
# Database
POSTGRES_DB=odin_valkyrie
POSTGRES_USER=odin_user
POSTGRES_PASSWORD=your-secure-password

# API Keys
ODIN_ADMIN_KEY=your-admin-key
ODIN_READER_KEY=your-reader-key

# Encryption
ODIN_SECRET_KEY=your-32-byte-base64-key

# Files
FILES_DIR=/files
```

### Customization
- **Themes**: Modify `frontend/src/index.css`
- **API Endpoints**: Update `frontend/src/services/api.js`
- **Database**: Modify `backend/app/models.py`
- **Authentication**: Customize `backend/app/auth.py`

## 🚨 Security Considerations

### Production Deployment
1. **Change Default Keys**: Generate new API keys and encryption keys
2. **Network Security**: Use HTTPS and secure network configuration
3. **Access Control**: Implement proper firewall rules
4. **Backup Strategy**: Regular encrypted backups of database and files
5. **Monitoring**: Set up logging and monitoring systems

### Best Practices
- Regular security updates
- Strong encryption keys
- Limited network access
- Regular backups
- User access auditing

## 📈 Scaling

### Horizontal Scaling
- Multiple backend instances behind a load balancer
- Shared database and file storage
- Redis for session management

### Vertical Scaling
- Increase container resources
- Optimize database queries
- Implement caching strategies

## 🆘 Troubleshooting

### Common Issues

#### Backend Won't Start
```bash
# Check logs
docker logs odin-valkyrie-backend

# Check database connection
docker logs odin-valkyrie-postgres

# Restart services
docker compose restart
```

#### Frontend Connection Issues
```bash
# Check API URL in frontend/.env
VITE_API_URL=http://localhost:6789

# Verify backend is running
curl http://localhost:6789/health
```

#### File Upload Problems
```bash
# Check file permissions
ls -la ./files/

# Check disk space
df -h

# Restart with fresh volumes
docker compose down -v
docker compose up -d
```

## 📝 License

This project is part of the Odin file management ecosystem.

## 🤝 Support

For support and questions:
- Check the troubleshooting section
- Review the API documentation
- Examine the logs for error details

---

**Odin Valkyrie** - Secure, encrypted file management for the modern enterprise.
