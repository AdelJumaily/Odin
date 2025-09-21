from fastapi import APIRouter
from sqlalchemy import text
from ..db import engine
router = APIRouter()
@router.get("/health")
def health():
    with engine.connect() as con:
        con.execute(text("SELECT 1"))
    return {"ok": True}
