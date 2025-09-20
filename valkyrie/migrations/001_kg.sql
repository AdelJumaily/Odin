-- relationships: generic edges among users, projects, docs
CREATE TABLE IF NOT EXISTS relationships (
  id SERIAL PRIMARY KEY,
  from_type TEXT NOT NULL,
  from_id   TEXT NOT NULL,
  rel       TEXT NOT NULL,
  to_type   TEXT NOT NULL,
  to_id     TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS rel_from_idx ON relationships (from_type, from_id, rel);
CREATE INDEX IF NOT EXISTS rel_to_idx   ON relationships (to_type, to_id, rel);

-- doc_entities: labels/tags extracted per document
CREATE TABLE IF NOT EXISTS doc_entities (
  id SERIAL PRIMARY KEY,
  doc_id INTEGER NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL,      -- e.g. 'PERSON','ORG','TOPIC','EXT','TAG'
  entity_value TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS doc_entities_lookup ON doc_entities (entity_type, entity_value);
CREATE INDEX IF NOT EXISTS doc_entities_doc    ON doc_entities (doc_id);

-- full-text: add tsvector on filename (extend later to include extracted text)
ALTER TABLE documents ADD COLUMN IF NOT EXISTS tsv tsvector;
UPDATE documents SET tsv = to_tsvector('english', coalesce(filename,''));
CREATE INDEX IF NOT EXISTS documents_tsv_idx ON documents USING GIN (tsv);
