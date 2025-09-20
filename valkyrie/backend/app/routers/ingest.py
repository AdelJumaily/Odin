# backend/app/routers/ingest.py
from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from ..db import engine
from ..auth import get_current_user  # must return a user object with .id and .role (e.g., "ceo")
from ..crypto import encrypt_file      # (pt_bytes: bytes, out_path: str) -> tuple[str nonce_b64, int size_bytes]
from ..services.kg import upsert_basic_edges_and_entities

router = APIRouter(prefix="/api", tags=["ingest"])

# Helper: check if user can write to project (owner/admin/editor or CEO)
def _can_write_project(con, user_id: int, user_role: str, project_id: int) -> bool:
    if user_role == "ceo":
        return True
    row = con.execute(
        text("""
            SELECT 1
            FROM project_membership
            WHERE project_id = :pid AND user_id = :uid
              AND role IN ('owner','admin','editor')
            LIMIT 1
        """),
        {"pid": project_id, "uid": user_id},
    ).fetchone()
    return bool(row)

@router.post("/ingest")
async def ingest(
    project_id: int = Form(...),
    owner_user_id: int = Form(...),
    upload: UploadFile = File(...),
    user = Depends(get_current_user)
):
    # Basic content sanity
    if not upload.filename:
        raise HTTPException(status_code=400, detail="filename required")

    pt_bytes = await upload.read()
    if pt_bytes is None or len(pt_bytes) == 0:
        raise HTTPException(status_code=400, detail="empty file")

    try:
        with engine.begin() as con:
            # RBAC: editor+ on the target project
            if not _can_write_project(con, user_id=user.id, user_role=getattr(user, "role", ""), project_id=project_id):
                raise HTTPException(status_code=403, detail="editor+ required")

            # 1) Create the placeholder document row to get ID
            doc_row = con.execute(
                text("""
                    INSERT INTO documents (filename, project_id, owner_user_id)
                    VALUES (:fn, :pid, :ouid)
                    RETURNING id
                """),
                {"fn": upload.filename, "pid": project_id, "ouid": owner_user_id},
            ).fetchone()
            doc_id = int(doc_row[0])

            # 2) Encrypt & persist the blob to the mounted volume
            out_path = f"/files/{doc_id}.bin"
            nonce_b64, size_bytes = encrypt_file(pt_bytes, out_path)

            # 3) Compute SHA-512 (in DB for portability/perf)
            # If you already have a Python helper, you can compute in Python:
            # sha512_hex = hashlib.sha512(pt_bytes).hexdigest()
            # Here we do it in SQL to avoid importing hashlib here.
            sha_row = con.execute(
                text("SELECT encode(digest(:data,'sha512'),'hex') AS h"),
                {"data": pt_bytes},
            ).fetchone()
            sha512_hex = sha_row["h"]

            # 4) Update the document with crypto/meta
            con.execute(
                text("""
                    UPDATE documents
                    SET size_bytes = :sz,
                        sha512     = :sha,
                        nonce_b64  = :nonce
                    WHERE id = :doc_id
                """),
                {"sz": size_bytes, "sha": sha512_hex, "nonce": nonce_b64, "doc_id": doc_id},
            )

            # 5) Record edges/entities + refresh FTS
            upsert_basic_edges_and_entities(
                con,
                doc_id=doc_id,
                project_id=project_id,
                owner_user_id=owner_user_id,
                filename=upload.filename,
            )

        # All good
        return JSONResponse({"doc_id": doc_id, "sha512": sha512_hex})

    except HTTPException:
        # bubble RBAC/validation errors
        raise
    except SQLAlchemyError as e:
        # database-related issues
        raise HTTPException(status_code=500, detail=f"database error: {str(e.__class__.__name__)}")
    except PermissionError:
        # filesystem permission (e.g., /files not writable)
        raise HTTPException(status_code=500, detail="filesystem permission error writing /files")
    except Exception as e:
        # generic fault
        raise HTTPException(status_code=500, detail="ingest failed")
