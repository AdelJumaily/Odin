from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from .. import schemas
from ..deps import get_current_user, get_db
from ..models import User, UserRole
from ..security import hash_password

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/me", response_model=schemas.UserBase)
async def get_me(current_user: User = Depends(get_current_user)):
    return current_user


@router.get("/", response_model=schemas.UserListResponse)
async def list_users(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role not in {UserRole.owner, UserRole.maintainer}:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient role")
    items = db.query(User).order_by(User.created_at).all()
    return schemas.UserListResponse(items=items)


@router.post("/", response_model=schemas.UserBase, status_code=status.HTTP_201_CREATED)
async def create_user(
    payload: schemas.UserCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if current_user.role not in {UserRole.owner, UserRole.maintainer}:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient role")
    existing = db.query(User).filter(User.email == payload.email).one_or_none()
    if existing:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already registered")
    user = User(
        email=payload.email,
        full_name=payload.full_name,
        hashed_password=hash_password(payload.password),
        role=payload.role,
    )
    db.add(user)
    db.flush()
    return user
