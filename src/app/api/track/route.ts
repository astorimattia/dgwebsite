
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

    // 2. Ignore Localhost and User IP
    if (ip === '::1' || ip === '127.0.0.1' || ip === '73.231.242.251') {
      return NextResponse.json({ success: true, ignored: true });
    }
    // Decode location data to avoid %20
    let safeCountry = country ? decodeURIComponent(country) : null;
    let safeCity = city ? decodeURIComponent(city) : null;
    let safeOrg: string | null = null;

    // Resolve location from IP if missing or unknown
    const isCountryInvalid = !safeCountry || safeCountry.toLowerCase() === 'unknown';
    const isCityInvalid = !safeCity || safeCity.toLowerCase() === 'unknown';
    const isIpValid = ip && ip.toLowerCase() !== 'unknown' && ip !== '::1' && ip !== '127.0.0.1';

    if ((isCountryInvalid || isCityInvalid) && isIpValid) {
      try {
        // Try ip-api.com first
        const res = await fetch(`http://ip-api.com/json/${ip}`);
        if (res.ok) {
          const data = await res.json();
          if (data.status === 'success') {
            safeCountry = data.country;
            safeCity = data.city;
            // Prefer Org, then ISP, then AS
            safeOrg = data.org || data.isp || data.as;
          }
        }

        // Fallback to ipwho.is if still unknown
        if (!safeCountry || !safeCity) {
          const res2 = await fetch(`http://ipwho.is/${ip}`);
          if (res2.ok) {
            const data2 = await res2.json();
            if (data2.success) {
              safeCountry = data2.country;
              safeCity = data2.city;
              safeOrg = data2.connection?.org || data2.connection?.isp || data2.connection?.asn?.toString();
            }
          }
        }
      } catch (e) {
        console.error('IP Geolocation failed:', e);
      }
    }

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
      pipeline.zincrby(`analytics:visitors:${visitorId}:pages:${today}`, 1, path);
    }

    // 4. Top Countries (Sorted Set)
    if (safeCountry && safeCountry !== 'unknown') {
      pipeline.zincrby(`analytics:countries:${today}`, 1, safeCountry);

      // 4a. Top Cities per Country
      if (safeCity && safeCity !== 'unknown') {
        pipeline.zincrby(`analytics:cities:${safeCountry}:${today}`, 1, safeCity);
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
        if (safeCountry && safeCountry !== 'unknown') {
          pipeline.zincrby(`analytics:referrers:country:${safeCountry}:${today}`, 1, domain);
        }
      } catch { }
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
        org: safeOrg || 'unknown',
        lastSeen: new Date().toISOString()
      });

      // Update Recent Identified Visitors List ONLY if identified
      if (isIdentified) {
        pipeline.lpush('analytics:recent_identified_visitors', visitorId);
      }

      // Update Recent Visitors List (Deduplicated)
      // Check if most recent visitor is same (to avoid duplicates)
      const lastVisitors = await redis.lrange('analytics:recent_visitors', 0, 0);
      const isDuplicate = lastVisitors.length > 0 && lastVisitors[0] === visitorId;

      if (!isDuplicate) {
        pipeline.lpush('analytics:recent_visitors', visitorId);
        pipeline.ltrim('analytics:recent_visitors', 0, 5000);

        // Country-specific list
        if (safeCountry && safeCountry !== 'unknown') {
          const countryKey = `analytics:recent_visitors:country:${safeCountry}`;
          pipeline.lpush(countryKey, visitorId);
          pipeline.ltrim(countryKey, 0, 1000);
        }
      }
    }

    // Set expiry for keys
    const HOURLY_EXPIRY = 60 * 60 * 48; // 48 hours
    pipeline.expire(`analytics:views:${currentHour}`, HOURLY_EXPIRY);
    pipeline.expire(`analytics:visitors:${currentHour}`, HOURLY_EXPIRY);

    await pipeline.exec();

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Analytics tracking error:', error);
    return NextResponse.json({ error: 'Tracking failed' }, { status: 500 });
  }
}
