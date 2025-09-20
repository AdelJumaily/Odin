# syntax=docker/dockerfile:1

FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Safer to run as non-root
RUN useradd -m appuser
WORKDIR /srv/valkyrie

# 1) Install Python deps first (better layer caching)
# (Context is the 'valkyrie' folder; requirements file is under backend/)
COPY backend/requirements.txt ./backend/requirements.txt
RUN pip install --no-cache-dir -r backend/requirements.txt

COPY backend/app ./backend/app

USER appuser

# FastAPI port
EXPOSE 6789

# Note: module path includes 'backend' because we copied to /srv/valkyrie/backend/app
CMD ["uvicorn", "backend.app.main:app", "--host", "0.0.0.0", "--port", "6789", "--workers", "1"]
