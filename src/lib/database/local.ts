// Local database connection and utilities (SQLite)

import Database from 'better-sqlite3';
import { 
  LocalDatabaseConfig, 
  UserSettings, 
  Session, 
  CachedOrganization, 
  CachedUser, 
  CachedDevice, 
  CachedEvent, 
  CachedIncident, 
  CachedFile, 
  LocalFile, 
  SyncStatus, 
  LocalAuditLog, 
  EncryptionKey, 
  OfflineQueue 
} from '@/types/database';

export class LocalDatabase {
  private db: Database.Database;

  constructor(config: LocalDatabaseConfig) {
    this.db = new Database(config.path);
    
    // Enable WAL mode for better concurrency
    if (config.enableWAL !== false) {
      this.db.pragma('journal_mode = WAL');
    }
    
    // Enable foreign keys
    if (config.enableForeignKeys !== false) {
      this.db.pragma('foreign_keys = ON');
    }

    // Initialize database schema
    this.initializeSchema();
  }

  private initializeSchema(): void {
    // This would load the schema from the SQL file
    // For now, we'll assume the schema is already created
    console.log('Local database initialized');
  }

  // User settings methods
  getSetting(key: string): string | null {
    const stmt = this.db.prepare('SELECT value FROM user_settings WHERE key = ?');
    const result = stmt.get(key) as { value: string } | undefined;
    return result?.value || null;
  }

  setSetting(key: string, value: string): void {
    const stmt = this.db.prepare(`
      INSERT OR REPLACE INTO user_settings (key, value, updated_at) 
      VALUES (?, ?, CURRENT_TIMESTAMP)
    `);
    stmt.run(key, value);
  }

  getAllSettings(): UserSettings[] {
    const stmt = this.db.prepare('SELECT * FROM user_settings ORDER BY key');
    return stmt.all() as UserSettings[];
  }

  // Session methods
  createSession(session: Omit<Session, 'id' | 'created_at' | 'updated_at'>): Session {
    const stmt = this.db.prepare(`
      INSERT INTO sessions (user_id, org_id, access_token, refresh_token, expires_at)
      VALUES (?, ?, ?, ?, ?)
    `);
    const result = stmt.run(session.user_id, session.org_id, session.access_token, session.refresh_token, session.expires_at);
    
    return this.getSession(result.lastInsertRowid as number)!;
  }

  getSession(id: number): Session | null {
    const stmt = this.db.prepare('SELECT * FROM sessions WHERE id = ?');
    return stmt.get(id) as Session | null;
  }

  getActiveSession(userId: string, orgId: string): Session | null {
    const stmt = this.db.prepare(`
      SELECT * FROM sessions 
      WHERE user_id = ? AND org_id = ? AND expires_at > datetime('now')
      ORDER BY created_at DESC LIMIT 1
    `);
    return stmt.get(userId, orgId) as Session | null;
  }

  updateSession(id: number, updates: Partial<Session>): Session {
    const fields = Object.keys(updates).filter(key => key !== 'id' && key !== 'created_at');
    const setClause = fields.map(field => `${field} = ?`).join(', ');
    const values = fields.map(field => updates[field as keyof Session]);
    
    const stmt = this.db.prepare(`UPDATE sessions SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`);
    stmt.run(...values, id);
    
    return this.getSession(id)!;
  }

  // Cached organization methods
  cacheOrganization(org: CachedOrganization): void {
    const stmt = this.db.prepare(`
      INSERT OR REPLACE INTO cached_organizations (id, name, slug, plan, settings, last_synced_at)
      VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `);
    stmt.run(org.id, org.name, org.slug, org.plan, JSON.stringify(org.settings));
  }

  getCachedOrganization(id: string): CachedOrganization | null {
    const stmt = this.db.prepare('SELECT * FROM cached_organizations WHERE id = ?');
    const result = stmt.get(id) as any;
    if (result) {
      result.settings = JSON.parse(result.settings);
    }
    return result;
  }

  // Cached user methods
  cacheUser(user: CachedUser): void {
    const stmt = this.db.prepare(`
      INSERT OR REPLACE INTO cached_users (id, org_id, email, first_name, last_name, role, permissions, last_synced_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `);
    stmt.run(user.id, user.org_id, user.email, user.first_name, user.last_name, user.role, JSON.stringify(user.permissions));
  }

  getCachedUsersByOrg(orgId: string): CachedUser[] {
    const stmt = this.db.prepare('SELECT * FROM cached_users WHERE org_id = ? ORDER BY last_synced_at DESC');
    const results = stmt.all(orgId) as any[];
    return results.map(result => ({
      ...result,
      permissions: JSON.parse(result.permissions)
    }));
  }

  // Cached device methods
  cacheDevice(device: CachedDevice): void {
    const stmt = this.db.prepare(`
      INSERT OR REPLACE INTO cached_devices (id, org_id, name, device_type, os, ip_address, mac_address, location, status, last_seen_at, metadata, last_synced_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `);
    stmt.run(
      device.id, device.org_id, device.name, device.device_type, device.os,
      device.ip_address, device.mac_address, JSON.stringify(device.location),
      device.status, device.last_seen_at, JSON.stringify(device.metadata)
    );
  }

  getCachedDevicesByOrg(orgId: string, limit = 100): CachedDevice[] {
    const stmt = this.db.prepare(`
      SELECT * FROM cached_devices 
      WHERE org_id = ? 
      ORDER BY last_seen_at DESC 
      LIMIT ?
    `);
    const results = stmt.all(orgId, limit) as any[];
    return results.map(result => ({
      ...result,
      location: result.location ? JSON.parse(result.location) : undefined,
      metadata: JSON.parse(result.metadata)
    }));
  }

  // Cached event methods
  cacheEvent(event: CachedEvent): void {
    const stmt = this.db.prepare(`
      INSERT OR REPLACE INTO cached_events (id, org_id, device_id, event_type, severity, source, message, data, tags, created_at, last_synced_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `);
    stmt.run(
      event.id, event.org_id, event.device_id, event.event_type, event.severity,
      event.source, event.message, JSON.stringify(event.data), JSON.stringify(event.tags), event.created_at
    );
  }

  getRecentEvents(orgId: string, days = 7, limit = 1000): CachedEvent[] {
    const stmt = this.db.prepare(`
      SELECT * FROM cached_events 
      WHERE org_id = ? AND created_at >= datetime('now', '-${days} days')
      ORDER BY created_at DESC 
      LIMIT ?
    `);
    const results = stmt.all(orgId, limit) as any[];
    return results.map(result => ({
      ...result,
      data: JSON.parse(result.data),
      tags: JSON.parse(result.tags)
    }));
  }

  // Cached incident methods
  cacheIncident(incident: CachedIncident): void {
    const stmt = this.db.prepare(`
      INSERT OR REPLACE INTO cached_incidents (id, org_id, title, description, severity, status, assigned_to, source_event_ids, affected_device_ids, resolution_notes, resolved_at, created_at, updated_at, last_synced_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `);
    stmt.run(
      incident.id, incident.org_id, incident.title, incident.description, incident.severity,
      incident.status, incident.assigned_to, JSON.stringify(incident.source_event_ids),
      JSON.stringify(incident.affected_device_ids), incident.resolution_notes,
      incident.resolved_at, incident.created_at, incident.updated_at
    );
  }

  getActiveIncidents(orgId: string): CachedIncident[] {
    const stmt = this.db.prepare(`
      SELECT * FROM cached_incidents 
      WHERE org_id = ? AND status IN ('open', 'investigating', 'mitigated')
      ORDER BY 
        CASE severity 
          WHEN 'critical' THEN 1 
          WHEN 'high' THEN 2 
          WHEN 'medium' THEN 3 
          WHEN 'low' THEN 4 
        END,
        created_at DESC
    `);
    const results = stmt.all(orgId) as any[];
    return results.map(result => ({
      ...result,
      source_event_ids: JSON.parse(result.source_event_ids),
      affected_device_ids: JSON.parse(result.affected_device_ids)
    }));
  }

  // Local file methods
  cacheLocalFile(localFile: Omit<LocalFile, 'id' | 'downloaded_at' | 'last_accessed_at'>): LocalFile {
    const stmt = this.db.prepare(`
      INSERT OR REPLACE INTO local_files (cloud_file_id, local_path, size_bytes)
      VALUES (?, ?, ?)
    `);
    const result = stmt.run(localFile.cloud_file_id, localFile.local_path, localFile.size_bytes);
    
    return this.getLocalFile(result.lastInsertRowid as number)!;
  }

  getLocalFile(id: number): LocalFile | null {
    const stmt = this.db.prepare('SELECT * FROM local_files WHERE id = ?');
    return stmt.get(id) as LocalFile | null;
  }

  getLocalFileByCloudId(cloudFileId: string): LocalFile | null {
    const stmt = this.db.prepare('SELECT * FROM local_files WHERE cloud_file_id = ?');
    return stmt.get(cloudFileId) as LocalFile | null;
  }

  // Sync status methods
  updateSyncStatus(tableName: string, lastSyncAt: Date, syncToken?: string, errorMessage?: string): void {
    const stmt = this.db.prepare(`
      INSERT OR REPLACE INTO sync_status (table_name, last_sync_at, sync_token, error_message)
      VALUES (?, ?, ?, ?)
    `);
    stmt.run(tableName, lastSyncAt.toISOString(), syncToken, errorMessage);
  }

  getSyncStatus(tableName: string): SyncStatus | null {
    const stmt = this.db.prepare('SELECT * FROM sync_status WHERE table_name = ?');
    const result = stmt.get(tableName) as any;
    if (result && result.last_sync_at) {
      result.last_sync_at = new Date(result.last_sync_at);
    }
    return result;
  }

  // Local audit log methods
  createLocalAuditLog(auditLog: Omit<LocalAuditLog, 'id' | 'created_at'>): LocalAuditLog {
    const stmt = this.db.prepare(`
      INSERT INTO local_audit_logs (action, resource_type, resource_id, old_values, new_values, synced)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      auditLog.action, auditLog.resource_type, auditLog.resource_id,
      JSON.stringify(auditLog.old_values), JSON.stringify(auditLog.new_values), auditLog.synced
    );
    
    return this.getLocalAuditLog(result.lastInsertRowid as number)!;
  }

  getLocalAuditLog(id: number): LocalAuditLog | null {
    const stmt = this.db.prepare('SELECT * FROM local_audit_logs WHERE id = ?');
    const result = stmt.get(id) as any;
    if (result) {
      result.old_values = result.old_values ? JSON.parse(result.old_values) : undefined;
      result.new_values = result.new_values ? JSON.parse(result.new_values) : undefined;
    }
    return result;
  }

  getUnsyncedAuditLogs(): LocalAuditLog[] {
    const stmt = this.db.prepare('SELECT * FROM local_audit_logs WHERE synced = 0 ORDER BY created_at ASC');
    const results = stmt.all() as any[];
    return results.map(result => ({
      ...result,
      old_values: result.old_values ? JSON.parse(result.old_values) : undefined,
      new_values: result.new_values ? JSON.parse(result.new_values) : undefined
    }));
  }

  markAuditLogsAsSynced(ids: number[]): void {
    const stmt = this.db.prepare('UPDATE local_audit_logs SET synced = 1 WHERE id = ?');
    const transaction = this.db.transaction((ids: number[]) => {
      for (const id of ids) {
        stmt.run(id);
      }
    });
    transaction(ids);
  }

  // Offline queue methods
  addToOfflineQueue(queueItem: Omit<OfflineQueue, 'id' | 'created_at' | 'retry_count'>): OfflineQueue {
    const stmt = this.db.prepare(`
      INSERT INTO offline_queue (action, table_name, record_id, data, priority)
      VALUES (?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      queueItem.action, queueItem.table_name, queueItem.record_id,
      JSON.stringify(queueItem.data), queueItem.priority
    );
    
    return this.getOfflineQueueItem(result.lastInsertRowid as number)!;
  }

  getOfflineQueueItem(id: number): OfflineQueue | null {
    const stmt = this.db.prepare('SELECT * FROM offline_queue WHERE id = ?');
    const result = stmt.get(id) as any;
    if (result) {
      result.data = JSON.parse(result.data);
    }
    return result;
  }

  getOfflineQueueItems(limit = 100): OfflineQueue[] {
    const stmt = this.db.prepare(`
      SELECT * FROM offline_queue 
      ORDER BY priority DESC, created_at ASC 
      LIMIT ?
    `);
    const results = stmt.all(limit) as any[];
    return results.map(result => ({
      ...result,
      data: JSON.parse(result.data)
    }));
  }

  removeOfflineQueueItem(id: number): void {
    const stmt = this.db.prepare('DELETE FROM offline_queue WHERE id = ?');
    stmt.run(id);
  }

  // Cleanup methods
  cleanupOldData(retentionDays = 30): void {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - retentionDays);
    
    // Clean up old cached events
    const eventsStmt = this.db.prepare('DELETE FROM cached_events WHERE created_at < ?');
    eventsStmt.run(cutoffDate.toISOString());
    
    // Clean up old local files
    const filesStmt = this.db.prepare('DELETE FROM local_files WHERE downloaded_at < ?');
    filesStmt.run(cutoffDate.toISOString());
    
    // Clean up old audit logs
    const auditStmt = this.db.prepare('DELETE FROM local_audit_logs WHERE created_at < ? AND synced = 1');
    auditStmt.run(cutoffDate.toISOString());
  }

  // Health check
  healthCheck(): boolean {
    try {
      const stmt = this.db.prepare('SELECT 1');
      stmt.get();
      return true;
    } catch (error) {
      console.error('Local database health check failed:', error);
      return false;
    }
  }

  close(): void {
    this.db.close();
  }
}

// Singleton instance
let localDbInstance: LocalDatabase | null = null;

export function getLocalDatabase(config?: LocalDatabaseConfig): LocalDatabase {
  if (!localDbInstance && config) {
    localDbInstance = new LocalDatabase(config);
  }
  if (!localDbInstance) {
    throw new Error('Local database not initialized. Call with config first.');
  }
  return localDbInstance;
}

export function initializeLocalDatabase(config: LocalDatabaseConfig): LocalDatabase {
  localDbInstance = new LocalDatabase(config);
  return localDbInstance;
}
