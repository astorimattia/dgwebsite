import { redis } from './redis'
import { format, subDays, subHours, startOfDay, startOfHour } from 'date-fns'

export async function getAnalyticsData(timeRange: '24h' | '7d' | '30d') {
  const now = new Date()
  let dataPoints = []
  let totalViews = 0
  let totalVisitors = 0

  if (timeRange === '24h') {
    // Last 24 hours
    for (let i = 23; i >= 0; i--) {
      const date = subHours(now, i)
      const key = format(date, 'yyyy-MM-dd-HH')
      const views = (await redis.get(`analytics:views:hourly:${key}`)) ?? 0
      const visitors = await redis.pfcount(`analytics:visitors:hourly:${key}`)
      dataPoints.push({ name: format(date, 'HH:mm'), views: Number(views), visitors })
      totalViews += Number(views)
      totalVisitors += visitors
    }
  } else {
    const days = timeRange === '7d' ? 7 : 30
    for (let i = days - 1; i >= 0; i--) {
      const date = subDays(now, i)
      const key = format(date, 'yyyy-MM-dd')
      const views = (await redis.get(`analytics:views:daily:${key}`)) ?? 0
      const visitors = await redis.pfcount(`analytics:visitors:daily:${key}`)
      dataPoints.push({ name: format(date, 'MMM dd'), views: Number(views), visitors })
      totalViews += Number(views)
      totalVisitors += visitors
    }
  }

  // Top rankings (Fetching for TODAY only for simplicity)
  const dayKey = format(now, 'yyyy-MM-dd')

  // ioredis returns array of strings [member, score, member, score] when WITHSCORES is passed
  // We use revRange to get high scores first (zrevrange in standard redis, ioredis supports zrange with REV argument in newer versions, or zrevrange)
  // ioredis/Redis 6.2+ supports ZRANGE with REV
  // But safest for older redis versions (if cloud is older) is zrevrange

  // Actually, Redis Cloud is 7.2+ usually. ioredis `zrange` is generic.
  // let's use zrevrange for compatibility with 'WITHSCORES' string arg

  const topPages = await redis.zrevrange(`analytics:pages:daily:${dayKey}`, 0, 9, 'WITHSCORES')
  const topCountries = await redis.zrevrange(`analytics:countries:daily:${dayKey}`, 0, 9, 'WITHSCORES')
  const topReferrers = await redis.zrevrange(`analytics:referrers:daily:${dayKey}`, 0, 9, 'WITHSCORES')

  // Format ZRANGE result: [val, score, val, score...]
  const formatList = (list: string[]) => {
    const res = []
    for (let i = 0; i < list.length; i += 2) {
      res.push({ name: list[i], value: Number(list[i + 1]) })
    }
    return res
  }

  return {
    dataPoints,
    totalViews,
    totalVisitors,
    topPages: formatList(topPages),
    topCountries: formatList(topCountries),
    topReferrers: formatList(topReferrers),
  }
}
