from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request


class SessionMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # placeholder: verify cookie session
        response = await call_next(request)
        return response
