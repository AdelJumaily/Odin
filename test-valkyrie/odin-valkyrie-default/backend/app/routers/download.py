from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy import text
from sqlalchemy.orm import Session
from ..db import get_db
from ..deps import get_current_user, user_can_read_project
from ..crypto import decrypt_to_bytes

router = APIRouter(prefix="/api")

@router.get("/download/{doc_id}")
def download_doc(
    doc_id: int,
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    doc = db.execute(text("""
      SELECT id, filename, path_enc, project_id, mime, nonce_b64
      FROM documents WHERE id=:id
    """), {"id": doc_id}).mappings().first()
    if not doc:
        raise HTTPException(status_code=404, detail="Not found")

    if not (user["role"] == "ceo" or user_can_read_project(user, doc["project_id"], db)):
        raise HTTPException(status_code=403, detail="Not allowed")

    data = decrypt_to_bytes(doc["path_enc"], doc["nonce_b64"])
    return StreamingResponse(iter([data]), media_type=doc["mime"],
                             headers={"Content-Disposition": f'attachment; filename="{doc["filename"]}"'})
