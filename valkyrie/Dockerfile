FROM python:3.11-slim AS base
ENV POETRY_VERSION=1.7.1
RUN pip install "poetry==$POETRY_VERSION"
WORKDIR /app
COPY pyproject.toml poetry.lock* ./
RUN poetry config virtualenvs.create false && poetry install --no-root --only main
COPY . .
RUN poetry install --no-root

FROM base AS api
CMD ["uvicorn", "apps.api.main:app", "--host", "0.0.0.0", "--port", "6789"]
