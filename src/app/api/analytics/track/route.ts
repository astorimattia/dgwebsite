import { NextRequest, NextResponse } from 'next/server'
import { redis } from '@/lib/redis'
import { format } from 'date-fns'

export async function POST(req: NextRequest) {
  try {
    const { path, country, city, referrer, visitorId } = await req.json()

    if (!path || !visitorId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const now = new Date()
    const dayKey = format(now, 'yyyy-MM-dd')
    const hourKey = format(now, 'yyyy-MM-dd-HH')

    const pipeline = redis.pipeline()

    // Page Views
    pipeline.incr(`analytics:views:daily:${dayKey}`)
    pipeline.incr(`analytics:views:hourly:${hourKey}`)
    pipeline.expire(`analytics:views:hourly:${hourKey}`, 172800) // 48h

    // Unique Visitors
    // ioredis supports pfadd(key, ...elements)
    pipeline.pfadd(`analytics:visitors:daily:${dayKey}`, visitorId)
    pipeline.pfadd(`analytics:visitors:hourly:${hourKey}`, visitorId)
    pipeline.expire(`analytics:visitors:hourly:${hourKey}`, 172800)

    // Top Pages
    pipeline.zincrby(`analytics:pages:daily:${dayKey}`, 1, path)

    // Top Countries
    if (country && country !== 'Unknown') {
      pipeline.zincrby(`analytics:countries:daily:${dayKey}`, 1, country)
    }

    // Top Referrers
    if (referrer && referrer !== 'Direct') {
      try {
        const refUrl = new URL(referrer)
        pipeline.zincrby(`analytics:referrers:daily:${dayKey}`, 1, refUrl.hostname)
      } catch {
        pipeline.zincrby(`analytics:referrers:daily:${dayKey}`, 1, referrer)
      }
    }

    await pipeline.exec()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Track error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
