const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function generateApiKey(prefix = '', length = 16) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = prefix;
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function generateOrgKeys(orgName, orgId) {
  const keys = {
    organization: {
      name: orgName,
      id: orgId,
      generated: new Date().toISOString()
    },
    users: [
      {
        name: "CEO",
        role: "ceo",
        api_key: generateApiKey('ceo-', 12),
        description: "Full system access - can manage all projects and users"
      },
      {
        name: "Project Manager",
        role: "editor", 
        api_key: generateApiKey('pm-', 12),
        description: "Project management access - can manage assigned projects"
      },
      {
        name: "Developer 1",
        role: "editor",
        api_key: generateApiKey('dev1-', 10),
        description: "Development team access - can upload and manage files"
      },
      {
        name: "Developer 2", 
        role: "editor",
        api_key: generateApiKey('dev2-', 10),
        description: "Development team access - can upload and manage files"
      },
      {
        name: "Intern",
        role: "intern",
        api_key: generateApiKey('intern-', 8),
        description: "Limited access - can view and download files only"
      }
    ],
    projects: [
      {
        name: "Apollo",
        id: 1,
        description: "Main project for " + orgName
      },
      {
        name: "Zephyr", 
        id: 2,
        description: "Secondary project for " + orgName
      }
    ]
  };

  return keys;
}

function createApiKeysFile(orgName, orgId) {
  const keys = generateOrgKeys(orgName, orgId);
  
  // Create API keys file
  const apiKeysContent = `# Valkyrie API Keys for ${orgName}
# Generated: ${new Date().toISOString()}
# Organization ID: ${orgId}

## 🔑 API Keys

### CEO Access (Full System)
API Key: ${keys.users[0].api_key}
Role: ${keys.users[0].role}
Access: ${keys.users[0].description}

### Project Manager Access
API Key: ${keys.users[1].api_key}
Role: ${keys.users[1].role}
Access: ${keys.users[1].description}

### Developer 1 Access
API Key: ${keys.users[2].api_key}
Role: ${keys.users[2].role}
Access: ${keys.users[2].description}

### Developer 2 Access
API Key: ${keys.users[3].api_key}
Role: ${keys.users[3].role}
Access: ${keys.users[3].description}

### Intern Access
API Key: ${keys.users[4].api_key}
Role: ${keys.users[4].role}
Access: ${keys.users[4].description}

## 🏗️ Projects

### Apollo Project
Project ID: ${keys.projects[0].id}
Description: ${keys.projects[0].description}

### Zephyr Project
Project ID: ${keys.projects[1].id}
Description: ${keys.projects[1].description}

## 📋 Usage Examples

### Upload a file
curl -X POST \\
  -H "x-api-key: ${keys.users[0].api_key}" \\
  -F "project_id=1" \\
  -F "owner_user_id=1" \\
  -F "upload=@/path/to/file.txt" \\
  http://localhost:6789/api/ingest

### List files
curl -H "x-api-key: ${keys.users[0].api_key}" \\
  http://localhost:6789/api/list

### Download a file
curl -H "x-api-key: ${keys.users[0].api_key}" \\
  http://localhost:6789/api/download/1

## 🌐 Web Interface

Access the web interface at: http://localhost:3000
Default login: admin / admin123

## ⚠️ Security Notes

- Keep these API keys secure and confidential
- Each user should only receive their specific API key
- The CEO key has full system access - use with caution
- API keys are tied to your organization: ${orgName}
- Store this file securely and do not share publicly

---

Generated for ${orgName} (${orgId})
Valkyrie File Management System
`;

  // Create JSON configuration file
  const jsonConfig = {
    organization: keys.organization,
    users: keys.users,
    projects: keys.projects,
    endpoints: {
      web_interface: "http://localhost:3000",
      api_base: "http://localhost:6789",
      health_check: "http://localhost:6789/health",
      api_docs: "http://localhost:6789/docs"
    }
  };

  return {
    textContent: apiKeysContent,
    jsonConfig: jsonConfig
  };
}

// If run directly
if (require.main === module) {
  const orgName = process.argv[2] || 'Your Organization';
  const orgId = process.argv[3] || `org_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  const { textContent, jsonConfig } = createApiKeysFile(orgName, orgId);
  
  // Write files
  fs.writeFileSync('API_KEYS.txt', textContent);
  fs.writeFileSync('valkyrie-config.json', JSON.stringify(jsonConfig, null, 2));
  
  console.log(`✅ Generated API keys for ${orgName}`);
  console.log(`📁 Files created:`);
  console.log(`   - API_KEYS.txt (human readable)`);
  console.log(`   - valkyrie-config.json (machine readable)`);
  console.log(`\n🔑 CEO API Key: ${jsonConfig.users[0].api_key}`);
}

module.exports = { generateOrgKeys, createApiKeysFile };
