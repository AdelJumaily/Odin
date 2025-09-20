// Cloud database connection and utilities (PostgreSQL)

import { Pool, PoolClient, QueryResult } from 'pg';
import { DatabaseConfig, Organization, User, Device, Event, Incident, File, AuditLog } from '@/types/database';

export class CloudDatabase {
  private pool: Pool;
  private currentOrgId: string | null = null;

  constructor(config: DatabaseConfig) {
    this.pool = new Pool({
      host: config.host,
      port: config.port,
      database: config.database,
      user: config.username,
      password: config.password,
      ssl: config.ssl ? { rejectUnauthorized: false } : false,
      max: config.connectionLimit || 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    this.pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
    });
  }

  async connect(): Promise<PoolClient> {
    return await this.pool.connect();
  }

  async query<T = any>(text: string, params?: any[]): Promise<QueryResult<T>> {
    const client = await this.connect();
    try {
      // Set current organization context for RLS
      if (this.currentOrgId) {
        await client.query('SET app.current_org_id = $1', [this.currentOrgId]);
      }
      return await client.query(text, params);
    } finally {
      client.release();
    }
  }

  setCurrentOrg(orgId: string): void {
    this.currentOrgId = orgId;
  }

  clearCurrentOrg(): void {
    this.currentOrgId = null;
  }

  async close(): Promise<void> {
    await this.pool.end();
  }

  // Organization methods
  async createOrganization(org: Omit<Organization, 'id' | 'created_at' | 'updated_at'>): Promise<Organization> {
    const result = await this.query<Organization>(
      `INSERT INTO organizations (name, slug, domain, plan, settings)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [org.name, org.slug, org.domain, org.plan, JSON.stringify(org.settings)]
    );
    return result.rows[0];
  }

  async getOrganization(id: string): Promise<Organization | null> {
    const result = await this.query<Organization>(
      'SELECT * FROM organizations WHERE id = $1 AND deleted_at IS NULL',
      [id]
    );
    return result.rows[0] || null;
  }

  async updateOrganization(id: string, updates: Partial<Organization>): Promise<Organization> {
    const fields = Object.keys(updates).filter(key => key !== 'id' && key !== 'created_at');
    const values = fields.map((field, index) => `${field} = $${index + 2}`);
    const params = [id, ...fields.map(field => updates[field as keyof Organization])];

    const result = await this.query<Organization>(
      `UPDATE organizations SET ${values.join(', ')} WHERE id = $1 RETURNING *`,
      params
    );
    return result.rows[0];
  }

  // User methods
  async createUser(user: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
    const result = await this.query<User>(
      `INSERT INTO users (org_id, email, password_hash, first_name, last_name, role, permissions)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [user.org_id, user.email, user.password_hash, user.first_name, user.last_name, user.role, JSON.stringify(user.permissions)]
    );
    return result.rows[0];
  }

  async getUserByEmail(email: string, orgId: string): Promise<User | null> {
    const result = await this.query<User>(
      'SELECT * FROM users WHERE email = $1 AND org_id = $2 AND deleted_at IS NULL',
      [email, orgId]
    );
    return result.rows[0] || null;
  }

  async getUsersByOrg(orgId: string): Promise<User[]> {
    const result = await this.query<User>(
      'SELECT * FROM users WHERE org_id = $1 AND deleted_at IS NULL ORDER BY created_at DESC',
      [orgId]
    );
    return result.rows;
  }

  // Device methods
  async createDevice(device: Omit<Device, 'id' | 'created_at' | 'updated_at'>): Promise<Device> {
    const result = await this.query<Device>(
      `INSERT INTO devices (org_id, name, device_type, os, ip_address, mac_address, location, status, last_seen_at, metadata)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [
        device.org_id, device.name, device.device_type, device.os, device.ip_address,
        device.mac_address, JSON.stringify(device.location), device.status,
        device.last_seen_at, JSON.stringify(device.metadata)
      ]
    );
    return result.rows[0];
  }

  async getDevicesByOrg(orgId: string, limit = 100, offset = 0): Promise<Device[]> {
    const result = await this.query<Device>(
      'SELECT * FROM devices WHERE org_id = $1 AND deleted_at IS NULL ORDER BY last_seen_at DESC LIMIT $2 OFFSET $3',
      [orgId, limit, offset]
    );
    return result.rows;
  }

  async updateDeviceStatus(deviceId: string, status: Device['status']): Promise<Device> {
    const result = await this.query<Device>(
      'UPDATE devices SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [status, deviceId]
    );
    return result.rows[0];
  }

  // Event methods
  async createEvent(event: Omit<Event, 'id' | 'created_at'>): Promise<Event> {
    const result = await this.query<Event>(
      `INSERT INTO events (org_id, device_id, event_type, severity, source, message, data, tags)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        event.org_id, event.device_id, event.event_type, event.severity,
        event.source, event.message, JSON.stringify(event.data), event.tags
      ]
    );
    return result.rows[0];
  }

  async getEventsByOrg(orgId: string, filters: {
    device_id?: string;
    event_type?: string;
    severity?: string;
    start_date?: Date;
    end_date?: Date;
    limit?: number;
    offset?: number;
  } = {}): Promise<Event[]> {
    let query = 'SELECT * FROM events WHERE org_id = $1';
    const params: any[] = [orgId];
    let paramCount = 1;

    if (filters.device_id) {
      paramCount++;
      query += ` AND device_id = $${paramCount}`;
      params.push(filters.device_id);
    }

    if (filters.event_type) {
      paramCount++;
      query += ` AND event_type = $${paramCount}`;
      params.push(filters.event_type);
    }

    if (filters.severity) {
      paramCount++;
      query += ` AND severity = $${paramCount}`;
      params.push(filters.severity);
    }

    if (filters.start_date) {
      paramCount++;
      query += ` AND created_at >= $${paramCount}`;
      params.push(filters.start_date);
    }

    if (filters.end_date) {
      paramCount++;
      query += ` AND created_at <= $${paramCount}`;
      params.push(filters.end_date);
    }

    query += ' ORDER BY created_at DESC';

    if (filters.limit) {
      paramCount++;
      query += ` LIMIT $${paramCount}`;
      params.push(filters.limit);
    }

    if (filters.offset) {
      paramCount++;
      query += ` OFFSET $${paramCount}`;
      params.push(filters.offset);
    }

    const result = await this.query<Event>(query, params);
    return result.rows;
  }

  // Incident methods
  async createIncident(incident: Omit<Incident, 'id' | 'created_at' | 'updated_at'>): Promise<Incident> {
    const result = await this.query<Incident>(
      `INSERT INTO incidents (org_id, title, description, severity, status, assigned_to, source_event_ids, affected_device_ids, resolution_notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [
        incident.org_id, incident.title, incident.description, incident.severity,
        incident.status, incident.assigned_to, incident.source_event_ids,
        incident.affected_device_ids, incident.resolution_notes
      ]
    );
    return result.rows[0];
  }

  async getIncidentsByOrg(orgId: string, status?: string): Promise<Incident[]> {
    let query = 'SELECT * FROM incidents WHERE org_id = $1';
    const params: any[] = [orgId];

    if (status) {
      query += ' AND status = $2';
      params.push(status);
    }

    query += ' ORDER BY created_at DESC';

    const result = await this.query<Incident>(query, params);
    return result.rows;
  }

  // File methods
  async createFile(file: Omit<File, 'id' | 'created_at'>): Promise<File> {
    const result = await this.query<File>(
      `INSERT INTO files (org_id, filename, content_type, size_bytes, storage_path, storage_provider, checksum, encrypted, encryption_key_id, metadata, expires_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [
        file.org_id, file.filename, file.content_type, file.size_bytes,
        file.storage_path, file.storage_provider, file.checksum, file.encrypted,
        file.encryption_key_id, JSON.stringify(file.metadata), file.expires_at
      ]
    );
    return result.rows[0];
  }

  // Audit log methods
  async createAuditLog(auditLog: Omit<AuditLog, 'id' | 'created_at'>): Promise<AuditLog> {
    const result = await this.query<AuditLog>(
      `INSERT INTO audit_logs (org_id, user_id, api_key_id, action, resource_type, resource_id, old_values, new_values, ip_address, user_agent)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [
        auditLog.org_id, auditLog.user_id, auditLog.api_key_id, auditLog.action,
        auditLog.resource_type, auditLog.resource_id, JSON.stringify(auditLog.old_values),
        JSON.stringify(auditLog.new_values), auditLog.ip_address, auditLog.user_agent
      ]
    );
    return result.rows[0];
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      await this.query('SELECT 1');
      return true;
    } catch (error) {
      console.error('Database health check failed:', error);
      return false;
    }
  }
}

// Singleton instance
let cloudDbInstance: CloudDatabase | null = null;

export function getCloudDatabase(config?: DatabaseConfig): CloudDatabase {
  if (!cloudDbInstance && config) {
    cloudDbInstance = new CloudDatabase(config);
  }
  if (!cloudDbInstance) {
    throw new Error('Cloud database not initialized. Call with config first.');
  }
  return cloudDbInstance;
}

export function initializeCloudDatabase(config: DatabaseConfig): CloudDatabase {
  cloudDbInstance = new CloudDatabase(config);
  return cloudDbInstance;
}
