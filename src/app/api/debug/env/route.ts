import { NextResponse } from 'next/server';

/**
 * Debug endpoint to check if environment variables are set
 * This should be removed or protected in production
 */
export async function GET(req: Request) {
  // Simple auth check
  const { searchParams } = new URL(req.url);
  const key = searchParams.get('key');

  if (key !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({
    environment: process.env.NODE_ENV,
    checks: {
      REDIS_URL: process.env.REDIS_URL ? '✅ Set' : '❌ Not set',
      ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ? '✅ Set' : '❌ Not set',
    },
    redisUrlPreview: process.env.REDIS_URL
      ? process.env.REDIS_URL.replace(/:[^:@]+@/, ':****@')
      : 'Not set',
    timestamp: new Date().toISOString()
  });
}
