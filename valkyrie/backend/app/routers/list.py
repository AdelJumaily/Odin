from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import text
from sqlalchemy.orm import Session
from ..db import get_db
from ..deps import get_current_user, user_can_read_project

router = APIRouter(prefix="/api")

@router.get("/list")
def list_docs(
    project_id: int | None = None,
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    if user["role"] != "ceo":
        if project_id is None:
            rows = db.execute(text("""
                SELECT d.id, d.filename, d.project_id, d.owner_user_id, d.created_at
                FROM documents d
                JOIN project_membership pm ON pm.project_id = d.project_id
                WHERE pm.user_id = :u
                ORDER BY d.id DESC LIMIT 200
            """), {"u": user["id"]}).mappings().all()
            return {"rows": [dict(r) for r in rows]}
        else:
            if not user_can_read_project(user, project_id, db):
                raise HTTPException(status_code=403, detail="No access to project")

    # CEO or authorized project scope
    if project_id is None:
        rows = db.execute(text("""
            SELECT id, filename, project_id, owner_user_id, created_at
            FROM documents ORDER BY id DESC LIMIT 500
        """)).mappings().all()
    else:
        rows = db.execute(text("""
            SELECT id, filename, project_id, owner_user_id, created_at
            FROM documents WHERE project_id=:p ORDER BY id DESC LIMIT 500
        """), {"p": project_id}).mappings().all()
    return {"rows": [dict(r) for r in rows]}
