
import { NextResponse } from 'next/server';
import { getAnalyticsData } from '@/lib/analytics';

export async function GET(req: Request) {
  // Check for admin_token cookie set by the login action
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token');

  if (!token || token.value !== 'true') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);

  try {
    const from = searchParams.get('from') || undefined;
    const to = searchParams.get('to') || undefined;
    const visitorPage = parseInt(searchParams.get('visitorPage') || '1');
    const visitorLimit = parseInt(searchParams.get('visitorLimit') || '10');
    const country = searchParams.get('country') || undefined;
    const visitorId = searchParams.get('visitorId') || undefined;
    const timeZone = searchParams.get('timeZone') || 'UTC';
    const granularity = searchParams.get('granularity') as 'day' | 'hour' || 'day';
    const search = searchParams.get('search') || undefined;

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

    return NextResponse.json(data);
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
