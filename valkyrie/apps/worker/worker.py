"""RQ worker entrypoint."""
from __future__ import annotations

import logging

from redis import Redis
from rq import Connection, Queue, Worker

from valkyrie.apps.api.deps import get_redis_client
from valkyrie.apps.worker.tasks import embed, graph_upsert, ingest_pipeline

logger = logging.getLogger(__name__)


def run() -> None:
    redis_client: Redis = get_redis_client()
    listen = ["ingest", "default"]
    queues = [Queue(name, connection=redis_client) for name in listen]
    with Connection(redis_client):
        logger.info("Starting Valkyrie worker listening on %s", listen)
        worker = Worker(queues)
        worker.work()


if __name__ == "__main__":
    run()
