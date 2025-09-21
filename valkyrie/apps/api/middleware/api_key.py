from fastapi import Request


async def verify_api_key(request: Request):
    # placeholder: check x-api-key header for machine auth
    return True
