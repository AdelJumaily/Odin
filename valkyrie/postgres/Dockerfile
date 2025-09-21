FROM postgres:15

# Install build dependencies and build pgvector from source
USER root
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       build-essential \
       ca-certificates \
       git \
       postgresql-server-dev-15 \
    && rm -rf /var/lib/apt/lists/*

RUN git clone https://github.com/pgvector/pgvector.git /tmp/pgvector \
    && cd /tmp/pgvector \
    && make \
    && make install \
    && rm -rf /tmp/pgvector

# Clean up build deps to keep image small
RUN apt-get purge -y --auto-remove git build-essential postgresql-server-dev-15 \
    && rm -rf /var/lib/apt/lists/*

USER postgres
