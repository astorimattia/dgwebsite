import { redis } from './redis'

export type AnalyticsOptions = {
  key?: string
  from?: string
  to?: string
  visitorPage?: number
  visitorLimit?: number
  country?: string | null
  visitorId?: string | null
  timeZone?: string
  granularity?: 'day' | 'hour'
  search?: string
}

export async function getAnalyticsData(options: AnalyticsOptions = {}) {
  const {
    from: fromParam,
    to: toParam,
    visitorPage = 1,
    visitorLimit = 10,
    country: countryFilter = null,
    visitorId: visitorFilter = null,
    timeZone = 'UTC',
    granularity = 'day'
  } = options

  // Date Range Logic
  const now = new Date();
  const nowInTz = new Date(now.toLocaleString('en-US', { timeZone }));

  let startYmd = fromParam; // YYYY-MM-DD
  let endYmd = toParam;     // YYYY-MM-DD

  if (!startYmd && fromParam !== 'all') {
    const y = nowInTz.getFullYear();
    const m = String(nowInTz.getMonth() + 1).padStart(2, '0');
    const d = String(nowInTz.getDate()).padStart(2, '0');
    startYmd = `${y}-${m}-${d}`;
  }

  if (!endYmd && fromParam !== 'all') {
    const y = nowInTz.getFullYear();
    const m = String(nowInTz.getMonth() + 1).padStart(2, '0');
    const d = String(nowInTz.getDate()).padStart(2, '0');
    endYmd = `${y}-${m}-${d}`;
  }

  // Calculate Days Range
  const dates: string[] = [];
  if (fromParam === 'all') {
    const current = new Date('2024-01-01T00:00:00Z');
    const end = new Date();
    while (current <= end) {
      dates.push(current.toISOString().slice(0, 10));
      current.setDate(current.getDate() + 1);
    }
  } else {
    const s = new Date(startYmd!);
    const e = new Date(endYmd!);
    while (s <= e) {
      dates.push(s.toISOString().slice(0, 10));
      s.setDate(s.getDate() + 1);
    }
  }

  let totalViews = 0;
  let targetKeys: { view: string, visitor: string, label: string }[] = [];

  if (granularity === 'hour' && startYmd && endYmd) {
    const searchStart = new Date(startYmd);
    searchStart.setDate(searchStart.getDate() - 1); // Buffer
    const searchEnd = new Date(endYmd);
    searchEnd.setDate(searchEnd.getDate() + 2); // Buffer

    const current = new Date(searchStart);
    const validKeys: typeof targetKeys = [];

    while (current < searchEnd) {
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        hour12: false,
        hourCycle: 'h23'
      }).formatToParts(current);

      const p: Record<string, string> = {};
      parts.forEach(({ type, value }) => p[type] = value);
      const localYmd = `${p.year}-${p.month}-${p.day}`;

      if (localYmd >= startYmd && localYmd <= endYmd) {
        const utcY = current.getUTCFullYear();
        const utcM = String(current.getUTCMonth() + 1).padStart(2, '0');
        const utcD = String(current.getUTCDate()).padStart(2, '0');
        const utcH = String(current.getUTCHours()).padStart(2, '0');

        const utcKeySuffix = `${utcY}-${utcM}-${utcD}T${utcH}`;

        validKeys.push({
          view: `analytics:views:${utcKeySuffix}`,
          visitor: `analytics:visitors:${utcKeySuffix}`,
          label: current.toISOString()
        });
      }
      current.setTime(current.getTime() + 3600 * 1000); // +1 Hour
    }
    targetKeys = validKeys;
  } else {
    targetKeys = dates.map(d => ({
      view: `analytics:views:${d}`,
      visitor: `analytics:visitors:${d}`,
      label: d
    }));
  }

  const viewKeys = targetKeys.map(k => k.view);
  const visitorKeys = targetKeys.map(k => k.visitor);

  // Overview Totals (Daily Sums)
  const dailyViewKeys = dates.map(d => `analytics:views:${d}`);
  if (dailyViewKeys.length > 0) {
    const viewsPerDay = await redis.mget(dailyViewKeys);
    totalViews = viewsPerDay.reduce((acc, v) => acc + (parseInt(v || '0')), 0);
  }

  const dailyVisitorKeys = dates.map(d => `analytics:visitors:${d}`);
  const uniqueVisitors = await redis.pfcount(dailyVisitorKeys);

  // Chart Data
  const chartData = [];
  if (targetKeys.length > 0) {
    const chartPipeline = redis.multi();
    viewKeys.forEach(k => chartPipeline.get(k));
    visitorKeys.forEach(k => chartPipeline.pfcount(k));

    // ioredis exec returns [[err, result], [err, result]...]
    const results = await chartPipeline.exec();

    const mid = targetKeys.length;
    // Extract values from pipeline result
    const viewCounts = results ? results.slice(0, mid).map(r => r[1]) : [];
    const visitorCounts = results ? results.slice(mid).map(r => r[1]) : [];

    for (let i = 0; i < targetKeys.length; i++) {
      chartData.push({
        date: targetKeys[i].label,
        views: parseInt((viewCounts[i] as unknown as string) || '0'),
        visitors: (visitorCounts[i] as unknown as number) || 0,
      });
    }
  }

  // Helper for Top Lists
  const getTop = async (keys: string[]) => {
    if (keys.length === 0) return [];
    const pipeline = redis.multi();
    // Use zrevrange for high scores first
    keys.forEach(k => pipeline.zrevrange(k, 0, -1, 'WITHSCORES'));
    const results = await pipeline.exec();

    const agg = new Map<string, number>();
    results?.forEach((res) => {
      const dayList = res[1] as string[]; // [val, score, val, score]
      if (Array.isArray(dayList)) {
        for (let i = 0; i < dayList.length; i += 2) {
          const val = dayList[i];
          const score = Number(dayList[i + 1]);
          const current = agg.get(val) || 0;
          agg.set(val, current + score);
        }
      }
    });

    return Array.from(agg.entries())
      .map(([value, score]) => ({ value, score }))
      .filter(item => {
        const val = item.value.toLowerCase();
        if (val === 'unknown') return false;
        if (val.startsWith('/admin')) return false;
        return true;
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 50);
  };

  const pageKeys = visitorFilter
    ? dates.map(d => `analytics:visitors:${visitorFilter}:pages:${d}`)
    : countryFilter
      ? dates.map(d => `analytics:pages:country:${countryFilter}:${d}`)
      : dates.map(d => `analytics:pages:${d}`);

  const countryKeys = dates.map(d => `analytics:countries:${d}`);

  const referrerKeys = countryFilter
    ? dates.map(d => `analytics:referrers:country:${countryFilter}:${d}`)
    : dates.map(d => `analytics:referrers:${d}`);

  const cityKeys = countryFilter
    ? dates.map(d => `analytics:cities:${countryFilter}:${d}`)
    : dates.map(d => `analytics:cities:all:${d}`);

  const visitorTopKeys = dates.map(d => `analytics:visitors:top:${d}`);

  const [pages, countries, referrers, cities, topVisitors] = await Promise.all([
    getTop(pageKeys),
    getTop(countryKeys),
    visitorFilter ? Promise.resolve([]) : getTop(referrerKeys),
    getTop(cityKeys),
    getTop(visitorTopKeys)
  ]);

  let finalReferrers = referrers;
  if (visitorFilter) {
    const meta = await redis.hgetall(`analytics:visitor:${visitorFilter}`);
    if (meta && meta.referrer && meta.referrer !== 'unknown') {
      finalReferrers = [{ value: meta.referrer, score: 1 }];
    }
  }

  // Get Top Visitor Details
  const enrichedTopVisitors = await Promise.all(topVisitors.map(async (v) => {
    const vid = v.value;
    const [meta, email] = await Promise.all([
      redis.hgetall(`analytics:visitor:${vid}`),
      redis.get(`analytics:identity:${vid}`)
    ]);
    return {
      id: vid,
      value: v.score, // view count
      email: email || null,
      ip: meta.ip || null,
      country: meta.country || null,
      city: meta.city || null,
      referrer: meta.referrer || null,
      org: meta.org || null,
    };
  }));

  // Filter out localhost and private IPs
  const isLocalhost = (ip: string | null) => {
    if (!ip) return false;
    return ip === '127.0.0.1' ||
      ip === '::1' ||
      ip === 'localhost' ||
      ip.startsWith('192.168.') ||
      ip.startsWith('10.') ||
      ip.startsWith('172.16.') ||
      ip.startsWith('172.17.') ||
      ip.startsWith('172.18.') ||
      ip.startsWith('172.19.') ||
      ip.startsWith('172.20.') ||
      ip.startsWith('172.21.') ||
      ip.startsWith('172.22.') ||
      ip.startsWith('172.23.') ||
      ip.startsWith('172.24.') ||
      ip.startsWith('172.25.') ||
      ip.startsWith('172.26.') ||
      ip.startsWith('172.27.') ||
      ip.startsWith('172.28.') ||
      ip.startsWith('172.29.') ||
      ip.startsWith('172.30.') ||
      ip.startsWith('172.31.');
  };

  let filteredTopVisitors = enrichedTopVisitors.filter(v => !isLocalhost(v.ip));
  if (countryFilter) {
    filteredTopVisitors = filteredTopVisitors.filter(v => v.country === countryFilter);
  }

  // 2. Recent Visitor Identities & Pagination logic (simplified)
  let recentVisitorsKey = 'analytics:recent_visitors';
  if (countryFilter) {
    recentVisitorsKey = `analytics:recent_visitors:country:${countryFilter}`;
  }

  let recentIds: string[] = [];
  let totalFilteredVisitors = 0;

  // Simple Logic for now: Fetch from recent list
  const total = await redis.llen(recentVisitorsKey);
  totalFilteredVisitors = total;
  const start = (visitorPage - 1) * visitorLimit;
  const end = start + visitorLimit - 1;
  recentIds = await redis.lrange(recentVisitorsKey, start, end);

  const visitors = await Promise.all(recentIds.map(async (vid) => {
    const [meta, email] = await Promise.all([
      redis.hgetall(`analytics:visitor:${vid}`),
      redis.get(`analytics:identity:${vid}`)
    ]);
    return {
      id: vid,
      email: email || null,
      ip: meta.ip || null,
      country: meta.country || null,
      city: meta.city || null,
      referrer: meta.referrer || null,
      userAgent: meta.userAgent || null,
      org: meta.org || null,
      lastSeen: meta.lastSeen || null
    };
  }));

  // Filter out localhost from recent visitors
  const filteredVisitors = visitors.filter(v => !isLocalhost(v.ip));

  return {
    overview: {
      views: totalViews,
      visitors: uniqueVisitors,
    },
    data: {
      chart: chartData,
      pages: pages.map(p => ({ name: p.value, value: p.score })),
      countries: countries.map(c => ({ name: c.value, value: c.score })),
      cities: cities.map(c => ({ name: c.value, value: c.score })),
      referrers: finalReferrers.map(r => ({ name: r.value, value: r.score })),
      topVisitors: filteredTopVisitors.slice(0, 50),
      recentVisitors: filteredVisitors,
      pagination: {
        page: visitorPage,
        limit: visitorLimit,
        total: totalFilteredVisitors,
        totalPages: Math.ceil(totalFilteredVisitors / visitorLimit)
      }
    }
  }
}
