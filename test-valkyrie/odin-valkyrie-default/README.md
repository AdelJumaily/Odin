# Odin Valkyrie File Manager

**Organization:** default  
**Generated:** 2025-09-21T02:21:11.456Z

## 🚀 Quick Start

### For Linux/Mac:
```bash
chmod +x install.sh
./install.sh
```

### For Windows:
```cmd
install.bat
```

## 📋 Prerequisites

- Docker and Docker Compose installed
- At least 2GB RAM available
- Ports 3000 and 6789 available

## 🌐 Access Information

After installation, access your file manager at:
- **Web Interface:** http://localhost:3000
- **API Endpoint:** http://localhost:6789
- **Health Check:** http://localhost:6789/health

## 🔐 Default Login

- **Username:** admin
- **Password:** admin123

⚠️ **Important:** Change the default password after first login!

## 🏗️ Architecture

This package includes:
- **Backend:** FastAPI-based file management API
- **Frontend:** React-based file explorer interface
- **Database:** PostgreSQL for metadata storage
- **Encryption:** AES-256-GCM for file encryption
- **Search:** Full-text search with knowledge graph

## 📁 Features

- 🔐 End-to-End Encryption
- 🔍 Advanced Search & Knowledge Graph
- 📁 File & Folder Management
- 👥 User Access Control
- 🔄 Version Control
- 📱 Responsive Web Interface
- 🏠 Local Data Control

## 🛠️ Troubleshooting

If you encounter issues:
1. Ensure Docker is running
2. Check that ports 3000 and 6789 are available
3. Verify you have sufficient disk space
4. Check the logs: `docker-compose logs`

## 📞 Support

For technical support, contact your Odin administrator.

---

**Odin Valkyrie File Manager** - Secure, Local File Management
