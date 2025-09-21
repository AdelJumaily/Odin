# Dockerfile (at valkyrie/Dockerfile)
FROM python:3.11-slim

# System deps (optional but handy for psycopg, etc.)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential curl ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Non-root user
RUN useradd -m appuser
WORKDIR /srv/valkyrie

# Install Python deps
COPY backend/requirements.txt ./backend/requirements.txt
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy app code
COPY backend/app ./backend/app

# Runtime env
ENV PYTHONUNBUFFERED=1
ENV PORT=6789

# Expose API
EXPOSE 6789

# Drop privileges
USER appuser

# Launch FastAPI
CMD ["uvicorn", "backend.app.main:app", "--host", "0.0.0.0", "--port", "6789"]
