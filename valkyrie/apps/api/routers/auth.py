from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from .. import schemas
from ..deps import get_db
from ..middleware.sessions import clear_session_cookie, set_session_cookie
from ..models import User
from ..security import create_magic_link, verify_magic_link, verify_password
from ..services.mailer import get_mailer

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=schemas.UserBase)
async def login(payload: schemas.LoginRequest, response: Response, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).one_or_none()
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    set_session_cookie(response, str(user.id))
    return user


@router.post("/logout")
async def logout(response: Response):
    clear_session_cookie(response)
    return {"detail": "logged out"}


@router.post("/magic-link")
async def magic_link_request(
    payload: schemas.MagicLinkRequest,
    background: BackgroundTasks,
    db: Session = Depends(get_db),
):
    user = db.query(User).filter(User.email == payload.email).one_or_none()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    token = create_magic_link(payload.email)
    link = f"/auth/magic-link/verify?token={token}"
    mailer = get_mailer()
    background.add_task(mailer.send_magic_link, payload.email, link)
    return {"detail": "Magic link sent"}


@router.get("/magic-link/verify", response_model=schemas.UserBase)
async def magic_link_verify(token: str, response: Response, db: Session = Depends(get_db)):
    email = verify_magic_link(token)
    if not email:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid or expired token")
    user = db.query(User).filter(User.email == email).one_or_none()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    set_session_cookie(response, str(user.id))
    return user
