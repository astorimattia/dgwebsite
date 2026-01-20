
import { NextResponse } from 'next/server';
import { getAnalyticsData } from '@/lib/analytics';
import { ensureRedisConnection } from '@/lib/redis';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get('key');
  const adminPassword = process.env.ADMIN_PASSWORD;

  // TODO: Use better auth, e.g. cookie matching from `admin/actions.ts` check?
  // For now, simple key check or cookie check manually would be ideal.
  // Given the previous code used "cookies().get('admin_token')", we should probably check that here too?
  // Or just accept the key param for flexibility.

  // Cookie check:
  // import { cookies } from 'next/headers'; 
  // const cookieStore = await cookies();
  // const token = cookieStore.get('admin_token');
  // if (!token || token.value !== 'true') ...

  // For simplicity matching user logic, checking key OR cookie? 
  // Let's stick to key for API calls, but maybe client side needs to pass it?
  // The Admin Dashboard runs on client, it might NOT have the key in env var easily exposed to fetch.
  // It's safer to rely on the HttpOnly cookie for the Admin UI interactions.

  // Let's import cookies to check auth.
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token');

  if ((!adminPassword || key !== adminPassword) && (!token || token.value !== 'true')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Ensure Redis connection is ready before querying
    console.log('Analytics API: Ensuring Redis connection...');
    await ensureRedisConnection();
    console.log('Analytics API: Redis connection verified');

    const from = searchParams.get('from') || undefined;
    const to = searchParams.get('to') || undefined;
    const visitorPage = parseInt(searchParams.get('visitorPage') || '1');
    const visitorLimit = parseInt(searchParams.get('visitorLimit') || '10');
    const country = searchParams.get('country') || undefined;
    const visitorId = searchParams.get('visitorId') || undefined;
    const timeZone = searchParams.get('timeZone') || 'UTC';
    const granularity = searchParams.get('granularity') as 'day' | 'hour' || 'day';
    const search = searchParams.get('search') || undefined;

    console.log('Analytics API: Fetching data with params:', {
      from, to, visitorPage, visitorLimit, country, visitorId, timeZone, granularity
    });

    const data = await getAnalyticsData({
      from,
      to,
      visitorPage,
      visitorLimit,
      country,
      visitorId,
      timeZone,
      granularity,
      search
    });

    console.log('Analytics API: Data fetched successfully');
    return NextResponse.json(data);
  } catch (error) {
    console.error('Analytics API error:', error);

    // Provide more detailed error information
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;

    console.error('Error details:', {
      message: errorMessage,
      stack: errorStack,
      redisUrl: process.env.REDIS_URL ? 'Set' : 'Not set',
      adminPassword: process.env.ADMIN_PASSWORD ? 'Set' : 'Not set'
    });

    return NextResponse.json({
      error: 'Failed to fetch analytics',
      details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
    }, { status: 500 });
  }
}
