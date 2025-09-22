// Database synchronization utilities for cloud and local databases

import { CloudDatabase } from './cloud';
import { LocalDatabase } from './local';
import { SyncOptions, SyncStatus } from '@/types/database';

export class DatabaseSync {
  private cloudDb: CloudDatabase;
  private localDb: LocalDatabase;

  constructor(cloudDb: CloudDatabase, localDb: LocalDatabase) {
    this.cloudDb = cloudDb;
    this.localDb = localDb;
  }

  // Sync all data for an organization
  async syncOrganization(orgId: string, options: SyncOptions = {}): Promise<void> {
    const tables = options.tables || ['organizations', 'users', 'devices', 'events', 'incidents', 'files'];
    
    try {
      // Set organization context
      this.cloudDb.setCurrentOrg(orgId);

      for (const table of tables) {
        await this.syncTable(orgId, table, options);
      }

      // Update sync status
      this.localDb.updateSyncStatus('organization', new Date(), undefined, undefined);
      
    } catch (error) {
      console.error('Organization sync failed:', error);
      this.localDb.updateSyncStatus('organization', new Date(), undefined, error.message);
      throw error;
    } finally {
      this.cloudDb.clearCurrentOrg();
    }
  }

  // Sync specific table
  private async syncTable(orgId: string, tableName: string, options: SyncOptions): Promise<void> {
    const syncStatus = this.localDb.getSyncStatus(tableName);
    const since = options.since || (syncStatus?.last_sync_at ? new Date(syncStatus.last_sync_at) : undefined);
    
    try {
      switch (tableName) {
        case 'organizations':
          await this.syncOrganizations(orgId, since);
          break;
        case 'users':
          await this.syncUsers(orgId, since);
          break;
        case 'devices':
          await this.syncDevices(orgId, since);
          break;
        case 'events':
          await this.syncEvents(orgId, since, options);
          break;
        case 'incidents':
          await this.syncIncidents(orgId, since);
          break;
        case 'files':
          await this.syncFiles(orgId, since);
          break;
        default:
          console.warn(`Unknown table: ${tableName}`);
      }

      // Update sync status
      this.localDb.updateSyncStatus(tableName, new Date(), undefined, undefined);
      
    } catch (error) {
      console.error(`Sync failed for table ${tableName}:`, error);
      this.localDb.updateSyncStatus(tableName, new Date(), undefined, error.message);
      throw error;
    }
  }

  // Sync organizations
  private async syncOrganizations(orgId: string, since?: Date): Promise<void> {
    const org = await this.cloudDb.getOrganization(orgId);
    if (org) {
      this.localDb.cacheOrganization({
        id: org.id,
        name: org.name,
        slug: org.slug,
        plan: org.plan,
        settings: org.settings,
        last_synced_at: new Date()
      });
    }
  }

  // Sync users
  private async syncUsers(orgId: string, since?: Date): Promise<void> {
    const users = await this.cloudDb.getUsersByOrg(orgId);
    
    for (const user of users) {
      this.localDb.cacheUser({
        id: user.id,
        org_id: user.org_id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        permissions: user.permissions,
        last_synced_at: new Date()
      });
    }
  }

  // Sync devices
  private async syncDevices(orgId: string, since?: Date): Promise<void> {
    const devices = await this.cloudDb.getDevicesByOrg(orgId);
    
    for (const device of devices) {
      this.localDb.cacheDevice({
        id: device.id,
        org_id: device.org_id,
        name: device.name,
        device_type: device.device_type,
        os: device.os,
        ip_address: device.ip_address,
        mac_address: device.mac_address,
        location: device.location,
        status: device.status,
        last_seen_at: device.last_seen_at,
        metadata: device.metadata,
        last_synced_at: new Date()
      });
    }
  }

  // Sync events (with time-based filtering for performance)
  private async syncEvents(orgId: string, since?: Date, options: SyncOptions = {}): Promise<void> {
    const limit = options.batchSize || 1000;
    const startDate = since || new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // Default to last 7 days
    
    const events = await this.cloudDb.getEventsByOrg(orgId, {
      start_date: startDate,
      limit: limit
    });
    
    for (const event of events) {
      this.localDb.cacheEvent({
        id: event.id,
        org_id: event.org_id,
        device_id: event.device_id,
        event_type: event.event_type,
        severity: event.severity,
        source: event.source,
        message: event.message,
        data: event.data,
        tags: event.tags,
        created_at: event.created_at,
        last_synced_at: new Date()
      });
    }
  }

  // Sync incidents
  private async syncIncidents(orgId: string, since?: Date): Promise<void> {
    const incidents = await this.cloudDb.getIncidentsByOrg(orgId);
    
    for (const incident of incidents) {
      this.localDb.cacheIncident({
        id: incident.id,
        org_id: incident.org_id,
        title: incident.title,
        description: incident.description,
        severity: incident.severity,
        status: incident.status,
        assigned_to: incident.assigned_to,
        source_event_ids: incident.source_event_ids,
        affected_device_ids: incident.affected_device_ids,
        resolution_notes: incident.resolution_notes,
        resolved_at: incident.resolved_at,
        created_at: incident.created_at,
        updated_at: incident.updated_at,
        last_synced_at: new Date()
      });
    }
  }

  // Sync files metadata
  private async syncFiles(orgId: string, since?: Date): Promise<void> {
    // This would need to be implemented based on your file management API
    // For now, we'll skip the actual implementation
    console.log('File sync not implemented yet');
  }

  // Upload offline changes to cloud
  async uploadOfflineChanges(orgId: string): Promise<void> {
    try {
      // Get unsynced audit logs
      const unsyncedLogs = this.localDb.getUnsyncedAuditLogs();
      
      for (const log of unsyncedLogs) {
        // Upload to cloud database
        await this.cloudDb.createAuditLog({
          org_id: orgId,
          user_id: undefined, // Would need to be determined from context
          action: log.action,
          resource_type: log.resource_type,
          resource_id: log.resource_id,
          old_values: log.old_values,
          new_values: log.new_values,
          ip_address: undefined,
          user_agent: undefined
        });
      }

      // Mark as synced
      const logIds = unsyncedLogs.map(log => log.id);
      this.localDb.markAuditLogsAsSynced(logIds);

      // Process offline queue
      const queueItems = this.localDb.getOfflineQueueItems();
      
      for (const item of queueItems) {
        try {
          await this.processOfflineQueueItem(orgId, item);
          this.localDb.removeOfflineQueueItem(item.id);
        } catch (error) {
          console.error(`Failed to process offline queue item ${item.id}:`, error);
          // Could implement retry logic here
        }
      }

    } catch (error) {
      console.error('Upload offline changes failed:', error);
      throw error;
    }
  }

  // Process individual offline queue item
  private async processOfflineQueueItem(orgId: string, item: any): Promise<void> {
    this.cloudDb.setCurrentOrg(orgId);

    try {
      switch (item.action) {
        case 'create':
          await this.createResource(item.table_name, item.data);
          break;
        case 'update':
          await this.updateResource(item.table_name, item.record_id, item.data);
          break;
        case 'delete':
          await this.deleteResource(item.table_name, item.record_id);
          break;
        default:
          console.warn(`Unknown action: ${item.action}`);
      }
    } finally {
      this.cloudDb.clearCurrentOrg();
    }
  }

  // Generic resource operations
  private async createResource(tableName: string, data: any): Promise<void> {
    switch (tableName) {
      case 'devices':
        await this.cloudDb.createDevice(data);
        break;
      case 'incidents':
        await this.cloudDb.createIncident(data);
        break;
      // Add other resource types as needed
      default:
        console.warn(`Create not implemented for table: ${tableName}`);
    }
  }

  private async updateResource(tableName: string, recordId: string, data: any): Promise<void> {
    switch (tableName) {
      case 'devices':
        // Would need to implement updateDevice method
        console.warn('Update device not implemented yet');
        break;
      case 'incidents':
        // Would need to implement updateIncident method
        console.warn('Update incident not implemented yet');
        break;
      default:
        console.warn(`Update not implemented for table: ${tableName}`);
    }
  }

  private async deleteResource(tableName: string, recordId: string): Promise<void> {
    // Implement soft delete or hard delete based on requirements
    console.warn(`Delete not implemented for table: ${tableName}`);
  }

  // Get sync status for all tables
  getSyncStatus(): Record<string, SyncStatus | null> {
    const tables = ['organizations', 'users', 'devices', 'events', 'incidents', 'files'];
    const status: Record<string, SyncStatus | null> = {};
    
    for (const table of tables) {
      status[table] = this.localDb.getSyncStatus(table);
    }
    
    return status;
  }

  // Check if sync is needed
  needsSync(orgId: string, maxAgeMinutes = 5): boolean {
    const status = this.getSyncStatus();
    const now = new Date();
    
    for (const [table, syncStatus] of Object.entries(status)) {
      if (!syncStatus?.last_sync_at) {
        return true; // Never synced
      }
      
      const ageMinutes = (now.getTime() - syncStatus.last_sync_at.getTime()) / (1000 * 60);
      if (ageMinutes > maxAgeMinutes) {
        return true; // Stale data
      }
    }
    
    return false;
  }

  // Cleanup old data
  cleanup(retentionDays = 30): void {
    this.localDb.cleanupOldData(retentionDays);
  }
}
