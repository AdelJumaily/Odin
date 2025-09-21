 # valkyrie/backend/app/crypto.py

import os, base64, hashlib
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from .config import settings

aesgcm = AESGCM(settings.ODIN_SECRET_KEY)

def sha512_bytes(b: bytes) -> str:
    """Return SHA-512 hex digest of bytes."""
    h = hashlib.sha512()
    h.update(b)
    return h.hexdigest()

def encrypt_file(plaintext_bytes: bytes, out_path: str) -> tuple[str, int]:
    """
    Encrypt plaintext bytes with AES-GCM and write ciphertext to out_path.
    Returns (nonce_b64, plaintext_size).
    """
    nonce = os.urandom(12)
    ct = aesgcm.encrypt(nonce, plaintext_bytes, associated_data=None)
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, "wb") as f:
        f.write(ct)
    return base64.b64encode(nonce).decode(), len(plaintext_bytes)

def decrypt_to_bytes(cipher_path: str, nonce_b64: str) -> bytes:
    """Read ciphertext from file and return decrypted bytes."""
    with open(cipher_path, "rb") as f:
        ct = f.read()
    nonce = base64.b64decode(nonce_b64)
    return aesgcm.decrypt(nonce, ct, associated_data=None)
