-- Migration: 001_initial_schema.sql
-- Description: Initial database schema for Odin local desktop dashboard
-- Created: 2024-01-01

-- User settings and preferences
CREATE TABLE user_settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key VARCHAR(100) UNIQUE NOT NULL,
    value TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Session management
CREATE TABLE sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id VARCHAR(255) NOT NULL,
    org_id VARCHAR(255) NOT NULL,
    access_token TEXT,
    refresh_token TEXT,
    expires_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Cached organization data
CREATE TABLE cached_organizations (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) NOT NULL,
    plan VARCHAR(50) NOT NULL,
    settings TEXT, -- JSON
    last_synced_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Cached user data
CREATE TABLE cached_users (
    id VARCHAR(255) PRIMARY KEY,
    org_id VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role VARCHAR(50) NOT NULL,
    permissions TEXT, -- JSON
    last_synced_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Cached devices (last 30 days of activity)
CREATE TABLE cached_devices (
    id VARCHAR(255) PRIMARY KEY,
    org_id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    device_type VARCHAR(100) NOT NULL,
    os VARCHAR(100),
    ip_address VARCHAR(45),
    mac_address VARCHAR(17),
    location TEXT, -- JSON
    status VARCHAR(50) NOT NULL,
    last_seen_at DATETIME,
    metadata TEXT, -- JSON
    last_synced_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Cached events (last 7 days, most recent first)
CREATE TABLE cached_events (
    id VARCHAR(255) PRIMARY KEY,
    org_id VARCHAR(255) NOT NULL,
    device_id VARCHAR(255),
    event_type VARCHAR(100) NOT NULL,
    severity VARCHAR(20) NOT NULL,
    source VARCHAR(255),
    message TEXT,
    data TEXT, -- JSON
    tags TEXT, -- JSON array
    created_at DATETIME NOT NULL,
    last_synced_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Cached incidents (last 30 days)
CREATE TABLE cached_incidents (
    id VARCHAR(255) PRIMARY KEY,
    org_id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    severity VARCHAR(20) NOT NULL,
    status VARCHAR(50) NOT NULL,
    assigned_to VARCHAR(255),
    source_event_ids TEXT, -- JSON array
    affected_device_ids TEXT, -- JSON array
    resolution_notes TEXT,
    resolved_at DATETIME,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    last_synced_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Cached files metadata (last 30 days)
CREATE TABLE cached_files (
    id VARCHAR(255) PRIMARY KEY,
    org_id VARCHAR(255) NOT NULL,
    filename VARCHAR(255) NOT NULL,
    content_type VARCHAR(100),
    size_bytes INTEGER NOT NULL,
    storage_path VARCHAR(500) NOT NULL,
    checksum VARCHAR(64),
    encrypted BOOLEAN DEFAULT 0,
    metadata TEXT, -- JSON
    created_at DATETIME NOT NULL,
    last_synced_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Local file cache (for offline access)
CREATE TABLE local_files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cloud_file_id VARCHAR(255) NOT NULL,
    local_path TEXT NOT NULL,
    downloaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_accessed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    size_bytes INTEGER NOT NULL,
    UNIQUE(cloud_file_id)
);

-- Security policies cache
CREATE TABLE cached_security_policies (
    id VARCHAR(255) PRIMARY KEY,
    org_id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    policy_type VARCHAR(100) NOT NULL,
    conditions TEXT NOT NULL, -- JSON
    actions TEXT NOT NULL, -- JSON
    enabled BOOLEAN DEFAULT 1,
    last_synced_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Device groups cache
CREATE TABLE cached_device_groups (
    id VARCHAR(255) PRIMARY KEY,
    org_id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    device_ids TEXT, -- JSON array
    criteria TEXT, -- JSON
    last_synced_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Sync status tracking
CREATE TABLE sync_status (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    table_name VARCHAR(100) NOT NULL,
    last_sync_at DATETIME,
    sync_token VARCHAR(255),
    error_message TEXT,
    UNIQUE(table_name)
);

-- Local audit log (for offline actions)
CREATE TABLE local_audit_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(100) NOT NULL,
    resource_id VARCHAR(255),
    old_values TEXT, -- JSON
    new_values TEXT, -- JSON
    synced BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Encryption keys (wrapped/temporary keys for local decryption)
CREATE TABLE encryption_keys (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key_id VARCHAR(255) UNIQUE NOT NULL,
    wrapped_key TEXT NOT NULL, -- Encrypted key material
    key_type VARCHAR(50) NOT NULL, -- 'file', 'data', 'session'
    expires_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Offline queue (actions to sync when online)
CREATE TABLE offline_queue (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    action VARCHAR(100) NOT NULL,
    table_name VARCHAR(100) NOT NULL,
    record_id VARCHAR(255),
    data TEXT NOT NULL, -- JSON
    priority INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    retry_count INTEGER DEFAULT 0,
    last_retry_at DATETIME
);

-- Indexes for performance
CREATE INDEX idx_cached_events_org_created ON cached_events(org_id, created_at DESC);
CREATE INDEX idx_cached_events_device ON cached_events(device_id);
CREATE INDEX idx_cached_events_type_severity ON cached_events(event_type, severity);
CREATE INDEX idx_cached_incidents_org_status ON cached_incidents(org_id, status);
CREATE INDEX idx_cached_incidents_severity ON cached_incidents(severity);
CREATE INDEX idx_cached_devices_org_status ON cached_devices(org_id, status);
CREATE INDEX idx_local_audit_logs_synced ON local_audit_logs(synced);
CREATE INDEX idx_offline_queue_priority ON offline_queue(priority DESC, created_at);
CREATE INDEX idx_sessions_user_org ON sessions(user_id, org_id);

-- Triggers for updated_at timestamps
CREATE TRIGGER update_sessions_updated_at 
    AFTER UPDATE ON sessions
    FOR EACH ROW
    BEGIN
        UPDATE sessions SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

-- Views for common queries
CREATE VIEW recent_events AS
SELECT 
    e.*,
    d.name as device_name,
    d.device_type
FROM cached_events e
LEFT JOIN cached_devices d ON e.device_id = d.id
WHERE e.created_at >= datetime('now', '-7 days')
ORDER BY e.created_at DESC;

CREATE VIEW active_incidents AS
SELECT 
    i.*,
    u.first_name || ' ' || u.last_name as assigned_user_name
FROM cached_incidents i
LEFT JOIN cached_users u ON i.assigned_to = u.id
WHERE i.status IN ('open', 'investigating', 'mitigated')
ORDER BY 
    CASE i.severity 
        WHEN 'critical' THEN 1 
        WHEN 'high' THEN 2 
        WHEN 'medium' THEN 3 
        WHEN 'low' THEN 4 
    END,
    i.created_at DESC;

-- Insert default settings
INSERT INTO user_settings (key, value) VALUES 
    ('theme', 'dark'),
    ('api_endpoint', ''),
    ('auto_sync', 'true'),
    ('sync_interval_minutes', '5'),
    ('offline_mode', 'false'),
    ('last_org_id', ''),
    ('cache_retention_days', '30');
