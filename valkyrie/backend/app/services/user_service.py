import bcrypt
import secrets
import string
from sqlalchemy.orm import Session
from sqlalchemy import text
from ..models import User, Organization
from ..config import settings

def generate_api_key(prefix: str = '', length: int = 16) -> str:
    """Generate a secure API key"""
    chars = string.ascii_letters + string.digits
    key = prefix + ''.join(secrets.choice(chars) for _ in range(length))
    return key

def hash_password(password: str) -> str:
    """Hash a password using bcrypt"""
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

def verify_password(password: str, hashed_password: str) -> bool:
    """Verify a password against its hash"""
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))

def create_organization(db: Session, name: str, storage_limit_gb: int = 100) -> Organization:
    """Create a new organization"""
    org = Organization(
        name=name,
        storage_limit_gb=storage_limit_gb
    )
    db.add(org)
    db.commit()
    db.refresh(org)
    return org

def create_user(
    db: Session, 
    name: str, 
    email: str, 
    password: str, 
    organization_id: int, 
    role: str = "editor"
) -> User:
    """Create a new user with hashed password and API key"""
    
    # Generate unique API key
    api_key = generate_api_key(f"{role}-", 12)
    
    # Ensure API key is unique
    while db.execute(text("SELECT 1 FROM users WHERE api_key = :key"), {"key": api_key}).first():
        api_key = generate_api_key(f"{role}-", 12)
    
    # Hash password
    password_hash = hash_password(password)
    
    # Create user
    user = User(
        name=name,
        email=email,
        password_hash=password_hash,
        api_key=api_key,
        role=role,
        organization_id=organization_id
    )
    
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def authenticate_user(db: Session, email: str, password: str) -> User | None:
    """Authenticate user with email and password"""
    user = db.execute(
        text("SELECT * FROM users WHERE email = :email AND is_active = TRUE"), 
        {"email": email}
    ).mappings().first()
    
    if user and verify_password(password, user["password_hash"]):
        # Update last login
        db.execute(
            text("UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = :user_id"),
            {"user_id": user["id"]}
        )
        db.commit()
        return user
    
    return None

def get_user_by_api_key(db: Session, api_key: str) -> User | None:
    """Get user by API key"""
    return db.execute(
        text("SELECT * FROM users WHERE api_key = :api_key AND is_active = TRUE"), 
        {"api_key": api_key}
    ).mappings().first()

def get_organization_by_id(db: Session, org_id: int) -> Organization | None:
    """Get organization by ID"""
    return db.execute(
        text("SELECT * FROM organizations WHERE id = :org_id AND is_active = TRUE"), 
        {"org_id": org_id}
    ).mappings().first()

def get_users_by_organization(db: Session, organization_id: int) -> list:
    """Get all users in an organization"""
    return db.execute(
        text("SELECT id, name, email, role, api_key, created_at, last_login FROM users WHERE organization_id = :org_id AND is_active = TRUE ORDER BY created_at DESC"), 
        {"org_id": organization_id}
    ).mappings().all()

def create_default_users(db: Session, organization_id: int) -> list:
    """Create default users for an organization"""
    users = []
    
    # Create CEO user
    ceo = create_user(db, "CEO", f"ceo@org{organization_id}.com", "admin123", organization_id, "ceo")
    users.append(ceo)
    
    # Create Project Manager
    pm = create_user(db, "Project Manager", f"pm@org{organization_id}.com", "pm123", organization_id, "editor")
    users.append(pm)
    
    # Create Developer
    dev = create_user(db, "Developer", f"dev@org{organization_id}.com", "dev123", organization_id, "editor")
    users.append(dev)
    
    # Create Intern
    intern = create_user(db, "Intern", f"intern@org{organization_id}.com", "intern123", organization_id, "intern")
    users.append(intern)
    
    return users
