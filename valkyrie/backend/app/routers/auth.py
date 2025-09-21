from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from ..db import get_db
from ..services.user_service import (
    create_organization, 
    create_user, 
    authenticate_user, 
    get_user_by_api_key,
    get_organization_by_id,
    create_default_users
)

router = APIRouter(prefix="/auth", tags=["authentication"])

class SignupRequest(BaseModel):
    name: str
    email: EmailStr
    organization: str
    password: str
    confirmPassword: str
    storageAmount: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class LoginResponse(BaseModel):
    success: bool
    user: dict = None
    api_key: str = None
    organization: dict = None
    error: str = None

class SignupResponse(BaseModel):
    success: bool
    organization_id: int = None
    users: list = None
    error: str = None

@router.post("/signup", response_model=SignupResponse)
async def signup(request: SignupRequest, db: Session = Depends(get_db)):
    """Create a new organization and users"""
    try:
        # Validate passwords match
        if request.password != request.confirmPassword:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Passwords do not match"
            )
        
        # Validate password strength
        if len(request.password) < 8:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Password must be at least 8 characters long"
            )
        
        # Parse storage amount
        storage_gb = 100
        if request.storageAmount.endswith('GB'):
            storage_gb = int(request.storageAmount[:-2])
        elif request.storageAmount.endswith('TB'):
            storage_gb = int(request.storageAmount[:-2]) * 1024
        elif request.storageAmount == 'unlimited':
            storage_gb = 10000  # 10TB limit
        
        # Create organization
        org = create_organization(db, request.organization, storage_gb)
        
        # Create default users for the organization
        users = create_default_users(db, org.id)
        
        # Create the main user (CEO)
        main_user = create_user(
            db, 
            request.name, 
            request.email, 
            request.password, 
            org.id, 
            "ceo"
        )
        
        # Return user info (without passwords)
        user_info = [
            {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "role": user.role,
                "api_key": user.api_key
            }
            for user in users + [main_user]
        ]
        
        return SignupResponse(
            success=True,
            organization_id=org.id,
            users=user_info
        )
        
    except Exception as e:
        return SignupResponse(
            success=False,
            error=str(e)
        )

@router.post("/login", response_model=LoginResponse)
async def login(request: LoginRequest, db: Session = Depends(get_db)):
    """Authenticate user with email and password"""
    try:
        user = authenticate_user(db, request.email, request.password)
        
        if not user:
            return LoginResponse(
                success=False,
                error="Invalid email or password"
            )
        
        # Get organization info
        org = get_organization_by_id(db, user["organization_id"])
        
        return LoginResponse(
            success=True,
            user={
                "id": user["id"],
                "name": user["name"],
                "email": user["email"],
                "role": user["role"],
                "organization_id": user["organization_id"]
            },
            api_key=user["api_key"],
            organization={
                "id": org["id"],
                "name": org["name"],
                "storage_limit_gb": org["storage_limit_gb"]
            } if org else None
        )
        
    except Exception as e:
        return LoginResponse(
            success=False,
            error=str(e)
        )

@router.get("/me")
async def get_current_user(api_key: str, db: Session = Depends(get_db)):
    """Get current user info by API key"""
    user = get_user_by_api_key(db, api_key)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid API key"
        )
    
    # Get organization info
    org = get_organization_by_id(db, user["organization_id"])
    
    return {
        "user": {
            "id": user["id"],
            "name": user["name"],
            "email": user["email"],
            "role": user["role"],
            "organization_id": user["organization_id"]
        },
        "organization": {
            "id": org["id"],
            "name": org["name"],
            "storage_limit_gb": org["storage_limit_gb"]
        } if org else None
    }
