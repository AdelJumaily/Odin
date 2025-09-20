// Vercel-specific database configuration
import { Pool } from 'pg';

// Vercel serverless function database connection
let pool: Pool | null = null;

export function getVercelDatabasePool(): Pool {
  if (!pool) {
    pool = new Pool({
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT || '5432'),
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
      max: parseInt(process.env.DATABASE_CONNECTION_LIMIT || '20'),
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    // Handle connection errors
    pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
    });
  }

  return pool;
}

// Vercel serverless function wrapper
export async function withDatabase<T>(
  handler: (pool: Pool) => Promise<T>
): Promise<T> {
  const pool = getVercelDatabasePool();
  
  try {
    return await handler(pool);
  } catch (error) {
    console.error('Database operation failed:', error);
    throw error;
  }
}

// Health check for Vercel
export async function checkVercelDatabaseHealth(): Promise<boolean> {
  try {
    const pool = getVercelDatabasePool();
    const client = await pool.connect();
    await client.query('SELECT 1');
    client.release();
    return true;
  } catch (error) {
    console.error('Vercel database health check failed:', error);
    return false;
  }
}
