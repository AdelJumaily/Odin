# Odin Database Architecture

This document describes the database architecture for the Odin security operations platform, which consists of two main database systems:

1. **Cloud Database (PostgreSQL)** - Multi-tenant centralized database for the web dashboard
2. **Local Database (SQLite)** - Lightweight local cache for the downloadable desktop dashboard

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Cloud Infrastructure                     │
├─────────────────────────────────────────────────────────────────┤
│  Web Dashboard (Next.js) ──┐                                   │
│                            │                                   │
│  Desktop Dashboard ────────┼─── PostgreSQL (Cloud DB)          │
│                            │   ├── Organizations               │
│  Mobile Apps ──────────────┘   ├── Users                       │
│                                 ├── Devices                     │
│                                 ├── Events (Partitioned)        │
│                                 ├── Incidents                   │
│                                 ├── Files (S3 Metadata)         │
│                                 ├── Audit Logs                  │
│                                 └── Security Policies           │
└─────────────────────────────────────────────────────────────────┘
                                │
                                │ Sync
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Desktop Application                         │
├─────────────────────────────────────────────────────────────────┤
│  Desktop Dashboard ──────── SQLite (Local DB)                  │
│                            ├── Cached Data                     │
│                            ├── User Settings                   │
│                            ├── Offline Queue                   │
│                            ├── Local Files                     │
│                            └── Sync Status                     │
└─────────────────────────────────────────────────────────────────┘
```

## Cloud Database (PostgreSQL)

### Purpose
- **Centralized**: Single source of truth for all organizations
- **Multi-tenant**: Row-level security ensures data isolation
- **Scalable**: Handles high-volume event streaming
- **Audit-friendly**: Complete audit trail of all actions

### Key Features

#### Multi-Tenancy
- Every table includes `org_id` for tenant isolation
- Row Level Security (RLS) policies prevent cross-tenant data access
- Organizations can have multiple users with different roles

#### Event Handling
- **Time-partitioned tables**: Events are partitioned by month for performance
- **High-volume optimized**: Designed to handle millions of events per day
- **Efficient indexing**: Optimized for time-based and severity-based queries

#### Security
- **API Key management**: Programmatic access with granular permissions
- **Audit logging**: Every action is logged with user context
- **Encryption support**: File metadata includes encryption key references

### Schema Overview

```sql
-- Core entities
organizations (id, name, slug, plan, settings, ...)
users (id, org_id, email, role, permissions, ...)
devices (id, org_id, name, type, status, location, ...)

-- High-volume data
events (id, org_id, device_id, type, severity, data, created_at)
  PARTITION BY RANGE (created_at)

-- Business logic
incidents (id, org_id, title, severity, status, assigned_to, ...)
security_policies (id, org_id, type, conditions, actions, ...)
device_groups (id, org_id, name, device_ids, criteria, ...)

-- File management
files (id, org_id, filename, storage_path, encrypted, ...)

-- Audit & compliance
audit_logs (id, org_id, user_id, action, resource_type, ...)
```

## Local Database (SQLite)

### Purpose
- **Offline capability**: Works without internet connection
- **Performance**: Fast local queries for recent data
- **Caching**: Stores frequently accessed data locally
- **Sync management**: Tracks what needs to be synchronized

### Key Features

#### Caching Strategy
- **Recent data only**: Last 7 days of events, 30 days of incidents
- **Selective sync**: Only syncs data relevant to the user's role
- **Incremental updates**: Only downloads changes since last sync

#### Offline Support
- **Offline queue**: Actions performed offline are queued for sync
- **Local audit logs**: Track offline actions for later upload
- **Conflict resolution**: Handle data conflicts when reconnecting

#### Performance
- **Optimized indexes**: Fast queries for common operations
- **Views**: Pre-built views for common queries (recent_events, active_incidents)
- **Cleanup**: Automatic cleanup of old cached data

### Schema Overview

```sql
-- User preferences
user_settings (key, value, updated_at)
sessions (user_id, org_id, access_token, expires_at, ...)

-- Cached data (mirrors cloud structure)
cached_organizations (id, name, slug, plan, settings, last_synced_at)
cached_users (id, org_id, email, role, permissions, last_synced_at)
cached_devices (id, org_id, name, type, status, last_synced_at)
cached_events (id, org_id, device_id, type, severity, created_at, last_synced_at)
cached_incidents (id, org_id, title, severity, status, last_synced_at)

-- Local functionality
local_files (cloud_file_id, local_path, downloaded_at, ...)
offline_queue (action, table_name, record_id, data, priority, ...)
local_audit_logs (action, resource_type, synced, created_at, ...)
sync_status (table_name, last_sync_at, sync_token, error_message)
```

## Data Synchronization

### Sync Strategy
1. **Incremental sync**: Only download changes since last sync
2. **Priority-based**: Critical data (incidents, alerts) sync first
3. **Conflict resolution**: Last-write-wins with audit trail
4. **Retry logic**: Failed syncs are retried with exponential backoff

### Sync Process
```typescript
// 1. Check what needs syncing
const needsSync = syncManager.needsSync(orgId, maxAgeMinutes);

// 2. Download changes from cloud
await syncManager.syncOrganization(orgId, {
  tables: ['events', 'incidents', 'devices'],
  since: lastSyncTime
});

// 3. Upload offline changes
await syncManager.uploadOfflineChanges(orgId);

// 4. Update sync status
syncManager.updateSyncStatus(tableName, new Date());
```

## Security Considerations

### Data Protection
- **Encryption at rest**: Database files are encrypted
- **Encryption in transit**: All API communication uses TLS
- **Key management**: Separate encryption keys for different data types
- **Access control**: Role-based permissions with audit logging

### Multi-Tenancy
- **Row-level security**: Database-level tenant isolation
- **API isolation**: Each organization's API calls are scoped
- **Resource limits**: Per-organization quotas and rate limiting

### Compliance
- **Audit trails**: Complete action logging for compliance
- **Data retention**: Configurable retention policies
- **Data export**: GDPR-compliant data export capabilities

## Performance Optimization

### Cloud Database
- **Partitioning**: Events table partitioned by time
- **Indexing**: Optimized indexes for common query patterns
- **Connection pooling**: Efficient connection management
- **Query optimization**: Prepared statements and query caching

### Local Database
- **WAL mode**: Write-ahead logging for better concurrency
- **Index optimization**: Strategic indexes for desktop app queries
- **Data cleanup**: Automatic cleanup of old cached data
- **Batch operations**: Efficient bulk insert/update operations

## Monitoring and Maintenance

### Health Checks
```typescript
// Check database connectivity
const health = await checkDatabaseHealth();
console.log({
  cloud: health.cloud,      // PostgreSQL connectivity
  local: health.local,      // SQLite file access
  overall: health.overall   // Both systems healthy
});
```

### Maintenance Tasks
- **Partition management**: Create new monthly partitions for events
- **Index maintenance**: Rebuild indexes for optimal performance
- **Data cleanup**: Archive or delete old data based on retention policies
- **Sync monitoring**: Track sync success rates and resolve failures

## Getting Started

### 1. Setup Databases
```bash
# Run the setup script
npm run db:setup

# Or manually setup each database
npm run db:cloud:migrate
npm run db:local:migrate
```

### 2. Configure Environment
```bash
# Copy and edit environment file
cp .env.example .env.local

# Update with your database credentials
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=odin_cloud
DATABASE_USER=odin_user
DATABASE_PASSWORD=your_password
```

### 3. Verify Setup
```bash
# Check database health
npm run db:health

# Start the application
npm run dev
```

## API Usage Examples

### Cloud Database
```typescript
import { getCloudDatabase } from '@/lib/database';

const db = getCloudDatabase();
db.setCurrentOrg('org-123');

// Create a new device
const device = await db.createDevice({
  org_id: 'org-123',
  name: 'Server-01',
  device_type: 'server',
  status: 'active'
});

// Query recent events
const events = await db.getEventsByOrg('org-123', {
  severity: 'critical',
  start_date: new Date(Date.now() - 24 * 60 * 60 * 1000)
});
```

### Local Database
```typescript
import { getLocalDatabase } from '@/lib/database';

const localDb = getLocalDatabase();

// Get user settings
const theme = localDb.getSetting('theme');

// Cache recent events
const events = localDb.getRecentEvents('org-123', 7, 1000);

// Add to offline queue
localDb.addToOfflineQueue({
  action: 'create',
  table_name: 'devices',
  data: { name: 'New Device', type: 'workstation' },
  priority: 1
});
```

### Synchronization
```typescript
import { DatabaseSync } from '@/lib/database';

const sync = new DatabaseSync(cloudDb, localDb);

// Sync organization data
await sync.syncOrganization('org-123', {
  tables: ['events', 'incidents', 'devices'],
  since: new Date(Date.now() - 60 * 60 * 1000) // Last hour
});

// Upload offline changes
await sync.uploadOfflineChanges('org-123');
```

This architecture provides a robust, scalable, and secure foundation for the Odin security operations platform, supporting both cloud-based and offline-capable deployments.
