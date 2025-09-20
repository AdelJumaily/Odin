# backend/app/utils/text.py
import re

_token_re = re.compile(r"[A-Za-z0-9]{2,20}")

def filename_tokens(name: str) -> list[str]:
    if not name:
        return []
    # Split on non-alnum, keep 2–20 char tokens, lowercased
    return [t.lower() for t in _token_re.findall(name)]
