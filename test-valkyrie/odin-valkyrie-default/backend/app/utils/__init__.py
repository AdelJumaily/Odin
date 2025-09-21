from .text import filename_tokens

# Try to import sanitize_filename from utils.text; if missing, provide a small fallback
try:
    from .text import sanitize_filename
except Exception:
    import re
    def sanitize_filename(name: str) -> str:
        """
        Fallback sanitizer: trim, replace unsafe chars with underscores,
        ensure a non-empty filename.
        """
        if not isinstance(name, str):
            name = str(name or "")
        name = name.strip()
        # Allow alphanumerics, dot, underscore, dash; replace others with _
        name = re.sub(r"[^\w.\-]", "_", name)
        return name or "file"
