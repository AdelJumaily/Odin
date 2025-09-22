from fastapi import Header, HTTPException, Depends
from sqlalchemy import text
from sqlalchemy.orm import Session
from .db import get_db

ROLE_ORDER = {"intern":0, "viewer":1, "editor":2, "admin":3, "ceo":4}

def get_current_user(x_api_key: str = Header(None), db: Session = Depends(get_db)):
    # DEVELOPMENT MODE - Skip API key validation
    DEV_MODE = True
    
    if DEV_MODE:
        # Return a mock user for development
        return {
            "id": 1,
            "name": "Developer",
            "role": "ceo"
        }
    
    # Production mode - validate API key
    user = db.execute(text("SELECT id, name, role FROM users WHERE api_key=:k"), {"k": x_api_key}).mappings().first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid API key")
    return user

def user_can_read_project(user, project_id: int, db: Session) -> bool:
    if user["role"] == "ceo":
        return True
    r = db.execute(text("""
        SELECT 1 FROM project_membership
        WHERE user_id=:u AND project_id=:p
        LIMIT 1
    """), {"u": user["id"], "p": project_id}).first()
    return r is not None

def require_min_role(user, min_role: str):
    if ROLE_ORDER[user["role"]] < ROLE_ORDER[min_role]:
        raise HTTPException(status_code=403, detail=f"{min_role}+ required")
