from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func
from sqlalchemy.orm import Session

from .. import schemas
from ..deps import get_current_user, get_db
from ..models import Document, IngestJob, Project, User, UserRole

router = APIRouter(prefix="/admin", tags=["admin"])


def _require_owner(user: User) -> None:
    if user.role not in {UserRole.owner, UserRole.maintainer}:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required")


@router.get("/stats")
async def stats(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    _require_owner(current_user)
    users = db.query(func.count(User.id)).scalar() or 0
    projects = db.query(func.count(Project.id)).scalar() or 0
    documents = db.query(func.count(Document.id)).scalar() or 0
    jobs = db.query(func.count(IngestJob.id)).scalar() or 0
    return {"users": users, "projects": projects, "documents": documents, "ingest_jobs": jobs}
