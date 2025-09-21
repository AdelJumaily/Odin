# backend/app/services/kg.py
from sqlalchemy import text
from sqlalchemy.engine import Connection
from ..utils.text import filename_tokens

def upsert_basic_edges_and_entities(con: Connection, *, doc_id: int, project_id: int,
                                    owner_user_id: int, filename: str):
    dkey = f"DOC:{doc_id}"
    pkey = f"PROJECT:{project_id}"
    ukey = f"USER:{owner_user_id}"

    # Edges: project contains doc, user authored doc
    con.execute(text("""
      INSERT INTO relationships (from_type, from_id, rel, to_type, to_id)
      VALUES
        ('PROJECT', :pkey, 'contains', 'DOC', :dkey),
        ('USER',    :ukey, 'authored', 'DOC', :dkey)
    """), {"pkey": pkey, "ukey": ukey, "dkey": dkey})

    # Entities: file extension + lightweight filename tokens
    ext = filename.rsplit(".", 1)[-1].lower() if "." in filename else ""
    rows = []
    if ext:
        rows.append({"doc_id": doc_id, "entity_type": "EXT", "entity_value": ext})
    for tok in filename_tokens(filename):
        rows.append({"doc_id": doc_id, "entity_type": "TOPIC", "entity_value": tok})

    if rows:
        con.execute(text("""
          INSERT INTO doc_entities (doc_id, entity_type, entity_value)
          VALUES (:doc_id, :entity_type, :entity_value)
        """), rows)

    # Refresh FTS vector
    con.execute(text("""
      UPDATE documents SET tsv = to_tsvector('english', coalesce(filename,''))
      WHERE id = :doc_id
    """), {"doc_id": doc_id})
