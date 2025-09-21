"""Session utilities for cookie-based auth."""
from __future__ import annotations

from datetime import timedelta
from typing import Optional

from fastapi import Response

from ..security import SESSION_COOKIE_NAME, create_session_token


def set_session_cookie(response: Response, user_id: str, max_age: int = 60 * 60 * 24 * 7) -> str:
    token = create_session_token(user_id, max_age)
    response.set_cookie(
        key=SESSION_COOKIE_NAME,
        value=token,
        max_age=max_age,
        httponly=True,
        secure=False,
        samesite="lax",
    )
    return token


def clear_session_cookie(response: Response) -> None:
    response.delete_cookie(SESSION_COOKIE_NAME)


__all__ = ["set_session_cookie", "clear_session_cookie"]
