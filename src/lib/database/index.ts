// Database module exports and configuration

export { CloudDatabase, getCloudDatabase, initializeCloudDatabase } from './cloud';
export { LocalDatabase, getLocalDatabase, initializeLocalDatabase } from './local';
export { DatabaseSync } from './sync';

export * from '@/types/database';

// Database configuration utilities
import { DatabaseConfig, LocalDatabaseConfig } from '@/types/database';

// Environment-based configuration
export function getCloudDatabaseConfig(): DatabaseConfig {
  return {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432'),
    database: process.env.DATABASE_NAME || 'odin_cloud',
    username: process.env.DATABASE_USER || 'odin_user',
    password: process.env.DATABASE_PASSWORD || '',
    ssl: process.env.DATABASE_SSL === 'true',
    connectionLimit: parseInt(process.env.DATABASE_CONNECTION_LIMIT || '20')
  };
}

export function getLocalDatabaseConfig(): LocalDatabaseConfig {
  return {
    path: process.env.LOCAL_DATABASE_PATH || './data/odin_local.db',
    enableWAL: process.env.LOCAL_DATABASE_WAL !== 'false',
    enableForeignKeys: process.env.LOCAL_DATABASE_FOREIGN_KEYS !== 'false'
  };
}

// Database health check
export async function checkDatabaseHealth(): Promise<{
  cloud: boolean;
  local: boolean;
  overall: boolean;
}> {
  const { CloudDatabase, LocalDatabase } = await import('./index');
  
  let cloudHealthy = false;
  let localHealthy = false;
  
  try {
    const cloudDb = new CloudDatabase(getCloudDatabaseConfig());
    cloudHealthy = await cloudDb.healthCheck();
    await cloudDb.close();
  } catch (error) {
    console.error('Cloud database health check failed:', error);
  }
  
  try {
    const localDb = new LocalDatabase(getLocalDatabaseConfig());
    localHealthy = localDb.healthCheck();
    localDb.close();
  } catch (error) {
    console.error('Local database health check failed:', error);
  }
  
  return {
    cloud: cloudHealthy,
    local: localHealthy,
    overall: cloudHealthy && localHealthy
  };
}
