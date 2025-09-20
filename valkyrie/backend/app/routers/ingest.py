from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException
from sqlalchemy import text
from sqlalchemy.orm import Session
from ..db import get_db
from ..config import settings
from ..deps import get_current_user, require_min_role, user_can_read_project
from ..crypto import encrypt_file, sha512_bytes

router = APIRouter(prefix="/api")

@router.post("/ingest")
async def ingest(
    file: UploadFile = File(...),
    project_id: int = Form(...),
    owner_user_id: int = Form(...),
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    # editor+ can ingest
    require_min_role(user, "editor")

    # must have access to the project
    if not user_can_read_project(user, project_id, db):
        raise HTTPException(status_code=403, detail="No access to project")

    pt = await file.read()
    sha = sha512_bytes(pt)

    # temp insert to get doc_id
    row = db.execute(text("""
        INSERT INTO documents(filename, path_enc, project_id, owner_user_id, mime, size_bytes, sha512, nonce_b64)
        VALUES (:fn,'',:pid,:uid,:mime,0,:sha,'') RETURNING id
    """), {
        "fn": file.filename,
        "pid": project_id,
        "uid": owner_user_id,
        "mime": file.content_type or "application/octet-stream",
        "sha": sha
    }).mappings().first()
    doc_id = row["id"]

    # encrypt and store
    path = f"{settings.FILES_DIR}/{doc_id}.bin"
    nonce_b64, size_bytes = encrypt_file(pt, path)

    db.execute(text("UPDATE documents SET path_enc=:p, size_bytes=:sz, nonce_b64=:n WHERE id=:id"),
               {"p": path, "sz": size_bytes, "n": nonce_b64, "id": doc_id})
    db.commit()
    return {"doc_id": doc_id, "sha512": sha}