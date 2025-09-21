#!/usr/bin/env python3
"""
Generate custom API keys for Valkyrie system
"""
import secrets
import string
import json

def generate_api_key(length=16):
    """Generate a secure API key"""
    alphabet = string.ascii_letters + string.digits
    return ''.join(secrets.choice(alphabet) for _ in range(length))

def generate_user_config():
    """Generate user configuration with custom API keys"""
    users = [
        {
            "name": "CEO",
            "api_key": f"ceo-{generate_api_key(12)}",
            "role": "ceo",
            "description": "Full system access"
        },
        {
            "name": "Project Manager",
            "api_key": f"pm-{generate_api_key(12)}",
            "role": "editor",
            "description": "Project management access"
        },
        {
            "name": "Developer 1",
            "api_key": f"dev1-{generate_api_key(12)}",
            "role": "editor",
            "description": "Development team access"
        },
        {
            "name": "Developer 2",
            "api_key": f"dev2-{generate_api_key(12)}",
            "role": "editor",
            "description": "Development team access"
        },
        {
            "name": "Intern",
            "api_key": f"intern-{generate_api_key(12)}",
            "role": "intern",
            "description": "Limited access"
        }
    ]
    
    return users

def create_docker_env_file(users):
    """Create environment file for Docker setup"""
    env_content = f"""# Valkyrie Environment Configuration
# Generated API Keys

# Database Configuration
DATABASE_URL=postgresql://valkyrie:valkyrie123@database:5432/valkyrie_db
POSTGRES_DB=valkyrie_db
POSTGRES_USER=valkyrie
POSTGRES_PASSWORD=valkyrie123

# File Storage
FILES_DIR=/app/data/files

# Security
ODIN_SECRET_KEY={secrets.token_urlsafe(32)}

# API Keys (for reference)
"""
    
    for user in users:
        env_content += f"# {user['name']}: {user['api_key']} ({user['role']})\n"
    
    return env_content

def main():
    print("🔑 Valkyrie API Key Generator")
    print("=" * 40)
    
    # Generate users with custom API keys
    users = generate_user_config()
    
    print("📋 Generated API Keys:")
    print("-" * 40)
    
    for user in users:
        print(f"👤 {user['name']}")
        print(f"   Key: {user['api_key']}")
        print(f"   Role: {user['role']}")
        print(f"   Access: {user['description']}")
        print()
    
    # Save configuration
    config = {
        "users": users,
        "projects": [
            {"name": "Apollo", "description": "Main project"},
            {"name": "Zephyr", "description": "Secondary project"}
        ]
    }
    
    with open("valkyrie-config.json", "w") as f:
        json.dump(config, f, indent=2)
    
    print("💾 Configuration saved to: valkyrie-config.json")
    
    # Create environment file
    env_content = create_docker_env_file(users)
    with open(".env", "w") as f:
        f.write(env_content)
    
    print("🐳 Environment file created: .env")
    
    print("\n" + "=" * 40)
    print("🚀 Next Steps:")
    print("1. Copy the API keys above")
    print("2. Update your Valkyrie installation")
    print("3. Restart the services")
    print("4. Test with the new API keys")
    print("=" * 40)

if __name__ == "__main__":
    main()
