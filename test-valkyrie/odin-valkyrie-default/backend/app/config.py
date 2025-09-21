import os, base64
from pydantic import BaseModel

class Settings(BaseModel):
    ODIN_ADMIN_KEY: str = os.getenv("ODIN_ADMIN_KEY", "admin")
    ODIN_READER_KEY: str = os.getenv("ODIN_READER_KEY", "reader")
    FILES_DIR: str = os.getenv("FILES_DIR", "/files")
    DATABASE_URL: str = os.getenv("DATABASE_URL")

    # 32-byte AES-GCM key (base64). If missing, generate ephemeral (dev-only).
    ODIN_SECRET_KEY: bytes = base64.b64decode(
        os.getenv("ODIN_SECRET_KEY", base64.b64encode(os.urandom(32)).decode())
    )

settings = Settings()
