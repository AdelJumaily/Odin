// Database types and interfaces for Odin platform

// ============================================================================
// CLOUD DATABASE TYPES (PostgreSQL)
// ============================================================================

export interface Organization {
  id: string;
  name: string;
  slug: string;
  domain?: string;
  plan: 'free' | 'pro' | 'enterprise';
  settings: Record<string, any>;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export interface User {
  id: string;
  org_id: string;
  email: string;
  password_hash: string;
  first_name?: string;
  last_name?: string;
  role: 'admin' | 'user' | 'viewer';
  permissions: Record<string, any>;
  last_login_at?: Date;
  email_verified_at?: Date;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export interface ApiKey {
  id: string;
  org_id: string;
  user_id?: string;
  name: string;
  key_hash: string;
  permissions: Record<string, any>;
  last_used_at?: Date;
  expires_at?: Date;
  created_at: Date;
  revoked_at?: Date;
}

export interface Device {
  id: string;
  org_id: string;
  name: string;
  device_type: 'server' | 'workstation' | 'mobile' | 'iot' | 'network' | 'other';
  os?: string;
  ip_address?: string;
  mac_address?: string;
  location?: {
    country?: string;
    region?: string;
    city?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  status: 'active' | 'quarantined' | 'offline' | 'maintenance';
  last_seen_at?: Date;
  metadata: Record<string, any>;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export interface Event {
  id: string;
  org_id: string;
  device_id?: string;
  event_type: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  source?: string;
  message?: string;
  data: Record<string, any>;
  tags: string[];
  created_at: Date;
}

export interface Incident {
  id: string;
  org_id: string;
  title: string;
  description?: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'open' | 'investigating' | 'mitigated' | 'resolved' | 'closed';
  assigned_to?: string;
  source_event_ids: string[];
  affected_device_ids: string[];
  resolution_notes?: string;
  resolved_at?: Date;
  created_at: Date;
  updated_at: Date;
  closed_at?: Date;
}

export interface File {
  id: string;
  org_id: string;
  filename: string;
  content_type?: string;
  size_bytes: number;
  storage_path: string;
  storage_provider: string;
  checksum?: string;
  encrypted: boolean;
  encryption_key_id?: string;
  metadata: Record<string, any>;
  created_at: Date;
  expires_at?: Date;
}

export interface AuditLog {
  id: string;
  org_id: string;
  user_id?: string;
  api_key_id?: string;
  action: string;
  resource_type: string;
  resource_id?: string;
  old_values?: Record<string, any>;
  new_values?: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
  created_at: Date;
}

export interface SecurityPolicy {
  id: string;
  org_id: string;
  name: string;
  description?: string;
  policy_type: 'quarantine' | 'alert' | 'block' | 'monitor';
  conditions: Record<string, any>;
  actions: Record<string, any>;
  enabled: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface DeviceGroup {
  id: string;
  org_id: string;
  name: string;
  description?: string;
  device_ids: string[];
  criteria?: Record<string, any>;
  created_at: Date;
  updated_at: Date;
}

// ============================================================================
// LOCAL DATABASE TYPES (SQLite)
// ============================================================================

export interface UserSettings {
  id: number;
  key: string;
  value?: string;
  updated_at: Date;
}

export interface Session {
  id: number;
  user_id: string;
  org_id: string;
  access_token?: string;
  refresh_token?: string;
  expires_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface CachedOrganization {
  id: string;
  name: string;
  slug: string;
  plan: string;
  settings: Record<string, any>;
  last_synced_at: Date;
}

export interface CachedUser {
  id: string;
  org_id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role: string;
  permissions: Record<string, any>;
  last_synced_at: Date;
}

export interface CachedDevice {
  id: string;
  org_id: string;
  name: string;
  device_type: string;
  os?: string;
  ip_address?: string;
  mac_address?: string;
  location?: Record<string, any>;
  status: string;
  last_seen_at?: Date;
  metadata: Record<string, any>;
  last_synced_at: Date;
}

export interface CachedEvent {
  id: string;
  org_id: string;
  device_id?: string;
  event_type: string;
  severity: string;
  source?: string;
  message?: string;
  data: Record<string, any>;
  tags: string[];
  created_at: Date;
  last_synced_at: Date;
}

export interface CachedIncident {
  id: string;
  org_id: string;
  title: string;
  description?: string;
  severity: string;
  status: string;
  assigned_to?: string;
  source_event_ids: string[];
  affected_device_ids: string[];
  resolution_notes?: string;
  resolved_at?: Date;
  created_at: Date;
  updated_at: Date;
  last_synced_at: Date;
}

export interface CachedFile {
  id: string;
  org_id: string;
  filename: string;
  content_type?: string;
  size_bytes: number;
  storage_path: string;
  checksum?: string;
  encrypted: boolean;
  metadata: Record<string, any>;
  created_at: Date;
  last_synced_at: Date;
}

export interface LocalFile {
  id: number;
  cloud_file_id: string;
  local_path: string;
  downloaded_at: Date;
  last_accessed_at: Date;
  size_bytes: number;
}

export interface CachedSecurityPolicy {
  id: string;
  org_id: string;
  name: string;
  description?: string;
  policy_type: string;
  conditions: Record<string, any>;
  actions: Record<string, any>;
  enabled: boolean;
  last_synced_at: Date;
}

export interface CachedDeviceGroup {
  id: string;
  org_id: string;
  name: string;
  description?: string;
  device_ids: string[];
  criteria?: Record<string, any>;
  last_synced_at: Date;
}

export interface SyncStatus {
  id: number;
  table_name: string;
  last_sync_at?: Date;
  sync_token?: string;
  error_message?: string;
}

export interface LocalAuditLog {
  id: number;
  action: string;
  resource_type: string;
  resource_id?: string;
  old_values?: Record<string, any>;
  new_values?: Record<string, any>;
  synced: boolean;
  created_at: Date;
}

export interface EncryptionKey {
  id: number;
  key_id: string;
  wrapped_key: string;
  key_type: 'file' | 'data' | 'session';
  expires_at?: Date;
  created_at: Date;
}

export interface OfflineQueue {
  id: number;
  action: string;
  table_name: string;
  record_id?: string;
  data: Record<string, any>;
  priority: number;
  created_at: Date;
  retry_count: number;
  last_retry_at?: Date;
}

// ============================================================================
// COMMON TYPES
// ============================================================================

export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  ssl?: boolean;
  connectionLimit?: number;
}

export interface LocalDatabaseConfig {
  path: string;
  enableWAL?: boolean;
  enableForeignKeys?: boolean;
}

export interface SyncOptions {
  tables: string[];
  since?: Date;
  batchSize?: number;
  forceFullSync?: boolean;
}

export interface QueryOptions {
  limit?: number;
  offset?: number;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
  filters?: Record<string, any>;
}

// ============================================================================
// API TYPES
// ============================================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface EventFilters {
  org_id: string;
  device_id?: string;
  event_type?: string;
  severity?: string;
  start_date?: Date;
  end_date?: Date;
  limit?: number;
  offset?: number;
}

export interface IncidentFilters {
  org_id: string;
  status?: string;
  severity?: string;
  assigned_to?: string;
  start_date?: Date;
  end_date?: Date;
  limit?: number;
  offset?: number;
}
