const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

async function createValkyriePackage(orgId) {
  try {
    const tempDir = path.join(__dirname, '..', 'temp-valkyrie-package');
    const packageDir = path.join(tempDir, `odin-valkyrie-${orgId}`);
    
    // Clean up any existing temp directory
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
    
    // Create package directory
    fs.mkdirSync(packageDir, { recursive: true });
    
    // Copy Valkyrie backend
    const valkyrieBackend = path.join(__dirname, '..', 'valkyrie', 'backend');
    const valkyrieFrontend = path.join(__dirname, '..', 'valkyrie', 'frontend');
    const valkyrieData = path.join(__dirname, '..', 'valkyrie', 'data');
    const valkyrieMigrations = path.join(__dirname, '..', 'valkyrie', 'migrations');
    const valkyrieDockerFiles = [
      path.join(__dirname, '..', 'valkyrie', 'docker-compose.yml'),
      path.join(__dirname, '..', 'valkyrie', 'docker-compose.override.yml'),
      path.join(__dirname, '..', 'valkyrie', 'install.sh'),
      path.join(__dirname, '..', 'valkyrie', 'install-complete.sh'),
      path.join(__dirname, '..', 'valkyrie', 'README.md')
    ];
    
    // Copy backend
    if (fs.existsSync(valkyrieBackend)) {
      execSync(`cp -r "${valkyrieBackend}" "${packageDir}/backend"`);
    }
    
    // Copy frontend
    if (fs.existsSync(valkyrieFrontend)) {
      execSync(`cp -r "${valkyrieFrontend}" "${packageDir}/frontend"`);
    }
    
    // Copy data directory
    if (fs.existsSync(valkyrieData)) {
      execSync(`cp -r "${valkyrieData}" "${packageDir}/data"`);
    }
    
    // Copy migrations
    if (fs.existsSync(valkyrieMigrations)) {
      execSync(`cp -r "${valkyrieMigrations}" "${packageDir}/migrations"`);
    }
    
    // Copy Docker files
    valkyrieDockerFiles.forEach(file => {
      if (fs.existsSync(file)) {
        const fileName = path.basename(file);
        fs.copyFileSync(file, path.join(packageDir, fileName));
      }
    });
    
    // Create installation script
    const installScript = `#!/bin/bash

# Odin Valkyrie File Manager Installation Script
# Organization: ${orgId}
# Generated: ${new Date().toISOString()}

set -e

echo "🚀 Starting Odin Valkyrie File Manager Installation..."
echo "Organization: ${orgId}"
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
`;

    fs.writeFileSync(path.join(packageDir, 'install.sh'), installScript);
    fs.chmodSync(path.join(packageDir, 'install.sh'), '755');
    
    // Create Windows batch file
    const installBat = `@echo off
REM Odin Valkyrie File Manager Installation Script for Windows
REM Organization: ${orgId}
REM Generated: ${new Date().toISOString()}

echo 🚀 Starting Odin Valkyrie File Manager Installation...
echo Organization: ${orgId}
echo.

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not installed. Please install Docker Desktop first.
    echo Visit: https://docs.docker.com/desktop/windows/install/
    pause
    exit /b 1
)

docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker Compose is not installed. Please install Docker Compose first.
    echo Visit: https://docs.docker.com/compose/install/
    pause
    exit /b 1
)

echo ✅ Docker and Docker Compose are installed

REM Run the installation
echo 🔧 Running installation script...
call install-complete.bat

echo.
echo 🎉 Installation Complete!
echo.
echo 📍 Access Information:
echo • Web Interface: http://localhost:3000
echo • API Endpoint: http://localhost:6789
echo • Health Check: http://localhost:6789/health
echo.
echo 🔐 Default Login:
echo • Username: admin
echo • Password: admin123
echo.
echo ⚠️  Please change the default password after first login!
echo.
echo For support, contact your Odin administrator.
pause
`;

    fs.writeFileSync(path.join(packageDir, 'install.bat'), installBat);
    
    // Create README
    const readme = `# Odin Valkyrie File Manager

**Organization:** ${orgId}  
**Generated:** ${new Date().toISOString()}

## 🚀 Quick Start

### For Linux/Mac:
\`\`\`bash
chmod +x install.sh
./install.sh
\`\`\`

### For Windows:
\`\`\`cmd
install.bat
\`\`\`

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
4. Check the logs: \`docker-compose logs\`

## 📞 Support

For technical support, contact your Odin administrator.

---

**Odin Valkyrie File Manager** - Secure, Local File Management
`;

    fs.writeFileSync(path.join(packageDir, 'README.md'), readme);
    
    // Create ZIP file
    const zipPath = path.join(__dirname, '..', 'public', `odin-valkyrie-${orgId}.zip`);
    
    // Ensure public directory exists
    if (!fs.existsSync(path.dirname(zipPath))) {
      fs.mkdirSync(path.dirname(zipPath), { recursive: true });
    }
    
    // Create ZIP using system zip command
    execSync(`cd "${tempDir}" && zip -r "${zipPath}" "odin-valkyrie-${orgId}"`);
    
    // Clean up temp directory
    fs.rmSync(tempDir, { recursive: true, force: true });
    
    console.log(`✅ Valkyrie package created: ${zipPath}`);
    return zipPath;
    
  } catch (error) {
    console.error('❌ Error creating Valkyrie package:', error);
    throw error;
  }
}

module.exports = { createValkyriePackage };

// If run directly
if (require.main === module) {
  const orgId = process.argv[2] || 'org_1758409386964_o0nyeae7k';
  createValkyriePackage(orgId)
    .then(zipPath => {
      console.log(`Package created successfully: ${zipPath}`);
    })
    .catch(error => {
      console.error('Failed to create package:', error);
      process.exit(1);
    });
}
