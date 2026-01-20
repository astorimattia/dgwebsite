
import { redis } from '@/lib/redis';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { path, country, city, referrer, visitorId, ip, userAgent } = body;

    // Basic validation
    if (!path) {
      return NextResponse.json({ error: 'Missing path' }, { status: 400 });
    }

    // 1. Ignore Admin Paths
    if (path.startsWith('/admin')) {
      return NextResponse.json({ success: true, ignored: true });
    }

    // 2. Ignore Localhost
    if (ip === '::1' || ip === '127.0.0.1') {
      return NextResponse.json({ success: true, ignored: true });
    }

    // Decode location data to avoid %20
    const safeCountry = country ? decodeURIComponent(country) : null;
    const safeCity = city ? decodeURIComponent(city) : null;

    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const currentHour = new Date().toISOString().slice(0, 13); // YYYY-MM-DDTHH

    // Check if visitor is identified
    let isIdentified = false;
    if (visitorId) {
      const identity = await redis.get(`analytics:identity:${visitorId}`);
      isIdentified = !!identity;
    }

    const pipeline = redis.multi();

    // 1. Total Page Views
    pipeline.incr(`analytics:views:${today}`);
    pipeline.incr(`analytics:views:${currentHour}`); // Add Hourly

    // 2. Unique Visitors (HyperLogLog)
    if (visitorId) {
      pipeline.pfadd(`analytics:visitors:${today}`, visitorId);
      pipeline.pfadd(`analytics:visitors:${currentHour}`, visitorId); // Add Hourly
    }

    // 3. Top Pages (Sorted Set)
    pipeline.zincrby(`analytics:pages:${today}`, 1, path);

    // 3b. Top Visitors (Sorted Set by View Count)
    if (visitorId) {
      pipeline.zincrby(`analytics:visitors:top:${today}`, 1, visitorId);

      // 3c. Pages per Visitor (Sorted Set) - Enables filtering "Top Pages" by Visitor
      pipeline.zincrby(`analytics:visitors:${visitorId}:pages:${today}`, 1, path);
    }

    // 4. Top Countries (Sorted Set)
    if (safeCountry) {
      pipeline.zincrby(`analytics:countries:${today}`, 1, safeCountry);

      // 4a. Top Cities per Country
      if (safeCity) {
        // Key: analytics:cities:{country}:{date}
        // We use daily aggregation for now
        pipeline.zincrby(`analytics:cities:${safeCountry}:${today}`, 1, safeCity);

        // 4b. Global Top Cities (for the "Top Cities" card when no country selected)
        pipeline.zincrby(`analytics:cities:all:${today}`, 1, safeCity);
      }

      // 4c. Top Pages per Country
      pipeline.zincrby(`analytics:pages:country:${safeCountry}:${today}`, 1, path);
    }

    // 5. Top Referrers (Sorted Set)
    if (referrer) {
      try {
        const domain = new URL(referrer).hostname;
        pipeline.zincrby(`analytics:referrers:${today}`, 1, domain);

        // 5b. Top Referrers per Country
        if (safeCountry) {
          pipeline.zincrby(`analytics:referrers:country:${safeCountry}:${today}`, 1, domain);
        }
      } catch {
        // Invalid URL
      }
    }

    // 6. Visitor Metadata & Identity
    if (visitorId) {
      const metaKey = `analytics:visitor:${visitorId}`;
      pipeline.hset(metaKey, {
        ip: ip || 'unknown',
        country: safeCountry || 'unknown',
        city: safeCity || 'unknown',
        referrer: referrer ? new URL(referrer).hostname : 'unknown',
        userAgent: userAgent || 'unknown',
        lastSeen: new Date().toISOString()
      });

      // Update Recent Identified Visitors List ONLY if identified
      if (isIdentified) {
        pipeline.lpush('analytics:recent_identified_visitors', visitorId);
      }

      // Update Recent Visitors List (Raw)
      const hasValidIp = ip && ip !== '::1' && ip !== '127.0.0.1' && ip !== 'unknown';
      const hasLocation = safeCountry && safeCountry !== 'unknown';

      if (isIdentified || hasValidIp || hasLocation) {
        // Allow duplicates (visit log style) - store latest at top
        pipeline.lpush('analytics:recent_visitors', visitorId);
        // Trim list to keep size manageable (e.g. 5000)
        pipeline.ltrim('analytics:recent_visitors', 0, 5000);

        // Add to country specific list if we have a valid country
        if (safeCountry && safeCountry !== 'unknown') {
          const countryKey = `analytics:recent_visitors:country:${safeCountry}`;
          pipeline.lpush(countryKey, visitorId);
          pipeline.ltrim(countryKey, 0, 1000);
        }
      }
    }

    // Set expiry for keys
    const HOURLY_EXPIRY = 60 * 60 * 48; // 48 hours for graph granularity

    // We only expire hourly keys. Daily keys are kept forever (or until eviction).
    pipeline.expire(`analytics:views:${currentHour}`, HOURLY_EXPIRY);
    pipeline.expire(`analytics:visitors:${currentHour}`, HOURLY_EXPIRY);

    await pipeline.exec();

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Analytics tracking error:', error);
    return NextResponse.json({ error: 'Tracking failed' }, { status: 500 });
  }
}
