-- Migration: 002_fix_events_table.sql
-- Description: Fix events table partitioning and RLS policies
-- Created: 2024-01-01

-- Drop the existing events table if it exists
DROP TABLE IF EXISTS events CASCADE;

-- Create events table with proper partitioning
CREATE TABLE events (
    id UUID DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    device_id UUID REFERENCES devices(id) ON DELETE SET NULL,
    event_type VARCHAR(100) NOT NULL,
    severity VARCHAR(20) DEFAULT 'info' CHECK (severity IN ('critical', 'high', 'medium', 'low', 'info')),
    source VARCHAR(255),
    message TEXT,
    data JSONB DEFAULT '{}',
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (id, created_at)
) PARTITION BY RANGE (created_at);

-- Create monthly partitions for events table
CREATE TABLE events_2024_01 PARTITION OF events
    FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');
CREATE TABLE events_2024_02 PARTITION OF events
    FOR VALUES FROM ('2024-02-01') TO ('2024-03-01');
CREATE TABLE events_2024_03 PARTITION OF events
    FOR VALUES FROM ('2024-03-01') TO ('2024-04-01');
CREATE TABLE events_2024_04 PARTITION OF events
    FOR VALUES FROM ('2024-04-01') TO ('2024-05-01');
CREATE TABLE events_2024_05 PARTITION OF events
    FOR VALUES FROM ('2024-05-01') TO ('2024-06-01');
CREATE TABLE events_2024_06 PARTITION OF events
    FOR VALUES FROM ('2024-06-01') TO ('2024-07-01');
CREATE TABLE events_2024_07 PARTITION OF events
    FOR VALUES FROM ('2024-07-01') TO ('2024-08-01');
CREATE TABLE events_2024_08 PARTITION OF events
    FOR VALUES FROM ('2024-08-01') TO ('2024-09-01');
CREATE TABLE events_2024_09 PARTITION OF events
    FOR VALUES FROM ('2024-09-01') TO ('2024-10-01');
CREATE TABLE events_2024_10 PARTITION OF events
    FOR VALUES FROM ('2024-10-01') TO ('2024-11-01');
CREATE TABLE events_2024_11 PARTITION OF events
    FOR VALUES FROM ('2024-11-01') TO ('2024-12-01');
CREATE TABLE events_2024_12 PARTITION OF events
    FOR VALUES FROM ('2024-12-01') TO ('2025-01-01');

-- Create indexes for events table
CREATE INDEX idx_events_org_id_created_at ON events(org_id, created_at);
CREATE INDEX idx_events_device_id ON events(device_id);
CREATE INDEX idx_events_type_severity ON events(event_type, severity);

-- Enable RLS on events table
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for events table
CREATE POLICY org_isolation_policy ON events
    FOR ALL TO PUBLIC
    USING (org_id = current_setting('app.current_org_id', true)::uuid);

-- Create authenticated role for RLS policies
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated') THEN
        CREATE ROLE authenticated;
    END IF;
END
$$;

-- Update RLS policies to use authenticated role
DROP POLICY IF EXISTS org_isolation_policy ON organizations;
DROP POLICY IF EXISTS org_isolation_policy ON users;
DROP POLICY IF EXISTS org_isolation_policy ON devices;
DROP POLICY IF EXISTS org_isolation_policy ON incidents;
DROP POLICY IF EXISTS org_isolation_policy ON files;
DROP POLICY IF EXISTS org_isolation_policy ON audit_logs;
DROP POLICY IF EXISTS org_isolation_policy ON security_policies;
DROP POLICY IF EXISTS org_isolation_policy ON device_groups;

-- Create new RLS policies
CREATE POLICY org_isolation_policy ON organizations
    FOR ALL TO authenticated
    USING (id = current_setting('app.current_org_id', true)::uuid);

CREATE POLICY org_isolation_policy ON users
    FOR ALL TO authenticated
    USING (org_id = current_setting('app.current_org_id', true)::uuid);

CREATE POLICY org_isolation_policy ON devices
    FOR ALL TO authenticated
    USING (org_id = current_setting('app.current_org_id', true)::uuid);

CREATE POLICY org_isolation_policy ON incidents
    FOR ALL TO authenticated
    USING (org_id = current_setting('app.current_org_id', true)::uuid);

CREATE POLICY org_isolation_policy ON files
    FOR ALL TO authenticated
    USING (org_id = current_setting('app.current_org_id', true)::uuid);

CREATE POLICY org_isolation_policy ON audit_logs
    FOR ALL TO authenticated
    USING (org_id = current_setting('app.current_org_id', true)::uuid);

CREATE POLICY org_isolation_policy ON security_policies
    FOR ALL TO authenticated
    USING (org_id = current_setting('app.current_org_id', true)::uuid);

CREATE POLICY org_isolation_policy ON device_groups
    FOR ALL TO authenticated
    USING (org_id = current_setting('app.current_org_id', true)::uuid);

-- Grant permissions to odin_user
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO odin_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO odin_user;
GRANT USAGE ON SCHEMA public TO odin_user;
