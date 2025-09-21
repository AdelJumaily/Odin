"""Security utilities for Valkyrie authentication."""
from __future__ import annotations

import secrets
from datetime import datetime, timedelta
from typing import Optional

from itsdangerous import BadSignature, SignatureExpired, URLSafeTimedSerializer
from passlib.context import CryptContext

from .config import get_settings


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(password: str, hashed: str | None) -> bool:
    if not password or not hashed:
        return False
    return pwd_context.verify(password, hashed)


def generate_api_key_token(length: int = 40) -> str:
    return secrets.token_urlsafe(length)


def _serializer() -> URLSafeTimedSerializer:
    settings = get_settings()
    return URLSafeTimedSerializer(settings.secret_key, salt="valkyrie-magic-link")


def create_magic_link(email: str, expires_in: int = 900) -> str:
    serializer = _serializer()
    token = serializer.dumps({"email": email, "issued_at": datetime.utcnow().isoformat()})
    return token


def verify_magic_link(token: str, max_age: int = 900) -> Optional[str]:
    serializer = _serializer()
    try:
        data = serializer.loads(token, max_age=max_age)
    except (BadSignature, SignatureExpired):
        return None
    return data.get("email")


SESSION_COOKIE_NAME = "valkyrie_session"


def create_session_token(user_id: str, expires_in: int = 60 * 60 * 24 * 7) -> str:
    serializer = URLSafeTimedSerializer(get_settings().secret_key, salt="valkyrie-session")
    payload = {"user_id": user_id, "exp": datetime.utcnow() + timedelta(seconds=expires_in)}
    return serializer.dumps(payload)


def decode_session_token(token: str) -> Optional[dict]:
    serializer = URLSafeTimedSerializer(get_settings().secret_key, salt="valkyrie-session")
    try:
        data = serializer.loads(token, max_age=60 * 60 * 24 * 30)
    except (BadSignature, SignatureExpired):
        return None
    return data
