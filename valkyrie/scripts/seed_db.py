#!/usr/bin/env python3
"""Simple DB seeder for Valkyrie.

This script connects to Postgres using DATABASE_URL env var (or VALKYRIE_DATABASE_URL)
and creates a minimal `projects` and `api_keys` table and inserts a single admin API key.

It purposefully avoids importing the full application to keep seeding simple.
"""
import os
import sys
import uuid
from urllib.parse import urlparse
import psycopg
from passlib.hash import bcrypt
import time


def get_database_url():
    return os.environ.get("VALKYRIE_DATABASE_URL") or os.environ.get("DATABASE_URL")


def ensure_tables(conn):
    with conn.cursor() as cur:
        cur.execute(
            """
        CREATE TABLE IF NOT EXISTS projects (
            id UUID PRIMARY KEY,
            name TEXT NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
        );

        CREATE TABLE IF NOT EXISTS api_keys (
            id UUID PRIMARY KEY,
            project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
            key TEXT NOT NULL,
            role TEXT NOT NULL DEFAULT 'admin',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
        );
        """
        )
    conn.commit()


def seed_admin(conn):
    # Idempotent seeding: if an admin key already exists, return info without revealing secret
    with conn.cursor() as cur:
        # ensure default project exists
        project_id = str(uuid.uuid4())
        cur.execute(
            "INSERT INTO projects (id, name) VALUES (%s, %s) ON CONFLICT DO NOTHING;",
            (project_id, "default"),
        )

        # Check if an admin API key already exists for the default project
        cur.execute(
            "SELECT id FROM api_keys WHERE role = 'admin' LIMIT 1;"
        )
        row = cur.fetchone()
        if row:
            conn.commit()
            existing_id = row[0]
            print(f"Admin API key already exists (id={existing_id}). To rotate, create a new key manually.")
            return None

        # create a new admin key and store only the hash
        admin_id = str(uuid.uuid4())
        raw_key = f"admin-{uuid.uuid4().hex}"
        hashed = bcrypt.hash(raw_key)

        cur.execute(
            "INSERT INTO api_keys (id, project_id, key, role) VALUES (%s, %s, %s, %s) ON CONFLICT DO NOTHING;",
            (admin_id, project_id, hashed, "admin"),
        )
    conn.commit()
    # Sleep a tiny bit to ensure logs show after container start
    time.sleep(0.1)
    print("Created admin API key (one-time shown below, store it safely):")
    print(raw_key)
    return raw_key


def main():
    db = get_database_url()
    if not db:
        print("No VALKYRIE_DATABASE_URL or DATABASE_URL set; cannot seed database.")
        sys.exit(1)

    # connect
    # psycopg (v3) accepts a full database URL string
    conn = psycopg.connect(db)
    try:
        ensure_tables(conn)
        key = seed_admin(conn)
        print(f"Seeding complete. Admin key: {key}")
    finally:
        conn.close()


if __name__ == "__main__":
    main()
