// API route for database health check
import { NextResponse } from 'next/server';
import { checkVercelDatabaseHealth } from '@/lib/database/vercel';

export async function GET() {
  try {
    const cloudHealthy = await checkVercelDatabaseHealth();
    
    return NextResponse.json({
      success: true,
      data: {
        cloud: cloudHealthy,
        local: false, // Not applicable on Vercel
        overall: cloudHealthy
      },
      timestamp: new Date().toISOString(),
      environment: 'vercel'
    });
  } catch (error) {
    console.error('Health check failed:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Health check failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
