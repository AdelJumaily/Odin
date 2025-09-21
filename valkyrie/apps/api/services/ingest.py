"""Helpers for scheduling ingestion work."""
from __future__ import annotations

import logging

from redis import Redis
from rq import Queue

from ..deps import get_redis_client
from ..config import get_settings

logger = logging.getLogger(__name__)


def enqueue_ingest(job_id: int) -> None:
    redis_client: Redis = get_redis_client()
    queue = Queue("ingest", connection=redis_client)
    queue.enqueue("valkyrie.apps.worker.tasks.ingest_pipeline.run_ingest_job", job_id)
    logger.info("Queued ingest job %s", job_id)

