from fastapi import APIRouter

router = APIRouter()


@router.get("/q")
async def search_q(q: str = ""):
    return {"query": q, "results": []}
