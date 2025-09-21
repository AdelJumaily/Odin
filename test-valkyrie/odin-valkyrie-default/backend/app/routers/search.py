# backend/app/routers/search.py
from fastapi import APIRouter, Depends, Query
from sqlalchemy import text
from ..db import engine
from ..auth import get_current_user  # expects user with properties: id, role ("ceo" or not)

router = APIRouter(prefix="/api/search", tags=["search"])

def _rbac_params(user):
    return {"uid": user.id, "is_ceo": (getattr(user, "role", "") == "ceo")}

@router.get("/text")
def text_search(q: str = Query(..., min_length=2), user=Depends(get_current_user)):
    sql = text("""
    WITH allowed AS (
      SELECT d.id, d.filename, d.created_at, d.tsv
      FROM documents d
      WHERE (:is_ceo) OR EXISTS (
        SELECT 1 FROM project_membership m
        WHERE m.project_id = d.project_id AND m.user_id = :uid
      )
    )
    SELECT id, filename, created_at,
           ts_rank(tsv, plainto_tsquery('english', :q)) AS rank
    FROM allowed
    WHERE tsv @@ plainto_tsquery('english', :q)
    ORDER BY rank DESC, created_at DESC
    LIMIT 50;
    """)
    with engine.connect() as con:
        rows = con.execute(sql, {**_rbac_params(user), "q": q}).mappings().all()
    return {"rows": [dict(r) for r in rows]}

@router.get("/entity")
def entity_search(type: str, value: str, user=Depends(get_current_user)):
    sql = text("""
    WITH allowed AS (
      SELECT d.id
      FROM documents d
      WHERE (:is_ceo) OR EXISTS (
        SELECT 1 FROM project_membership m
        WHERE m.project_id = d.project_id AND m.user_id = :uid
      )
    )
    SELECT d.id, d.filename, d.created_at
    FROM documents d
    JOIN doc_entities e ON e.doc_id = d.id
    JOIN allowed a ON a.id = d.id
    WHERE e.entity_type = :type AND e.entity_value = :value
    ORDER BY d.created_at DESC
    LIMIT 100;
    """)
    params = {**_rbac_params(user), "type": type, "value": value.lower()}
    with engine.connect() as con:
        rows = con.execute(sql, params).mappings().all()
    return {"rows": [dict(r) for r in rows]}

@router.get("/connected")
def connected(from_type: str, from_id: str, rel: str, user=Depends(get_current_user)):
    sql = text("""
    WITH edges AS (
      SELECT to_id
      FROM relationships
      WHERE from_type = :from_type AND from_id = :from_id AND rel = :rel AND to_type = 'DOC'
    ),
    allowed AS (
      SELECT d.id
      FROM documents d
      WHERE (:is_ceo) OR EXISTS (
        SELECT 1 FROM project_membership m
        WHERE m.project_id = d.project_id AND m.user_id = :uid
      )
    )
    SELECT d.id, d.filename, d.created_at
    FROM documents d
    JOIN allowed a ON a.id = d.id
    WHERE ('DOC:' || d.id) IN (SELECT to_id FROM edges)
    ORDER BY d.created_at DESC
    LIMIT 100;
    """)
    p = {**_rbac_params(user), "from_type": from_type, "from_id": from_id, "rel": rel}
    with engine.connect() as con:
        rows = con.execute(sql, p).mappings().all()
    return {"rows": [dict(r) for r in rows]}
