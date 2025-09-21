from contextlib import asynccontextmanager


@asynccontextmanager
async def lifespan(app):
    # setup resources here (db, caches)
    yield


def get_db():
    # placeholder dependency for db/session
    yield None
