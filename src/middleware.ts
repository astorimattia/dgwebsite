import { NextRequest, NextResponse, NextFetchEvent } from 'next/server'

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next (ALL Next.js internal requests — data, static, image, etc.)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next|favicon.ico|assets|sw.js).*)',
  ],
}

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  if (req.method !== 'GET') {
    return NextResponse.next()
  }

  // Skip RSC (React Server Component) requests — same URL, internal Next.js payload fetch
  if (req.headers.get('RSC') === '1' || req.headers.get('Next-Router-Prefetch') === '1') {
    return NextResponse.next()
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? req.ip ?? '127.0.0.1'
  const userAgent = req.headers.get('user-agent') ?? 'unknown'
  const path = req.nextUrl.pathname

  // Filter out known bots, crawlers, and scanners to reduce analytics noise
  // (This often explains a high number of views from places like China or US datacenters)
  const isBot = /bot|crawler|spider|crawling|headless|prerender|lighthouse|scanner/i.test(userAgent)
  if (isBot) {
    return NextResponse.next()
  }

  // Improved Location Handling
  let country = req.geo?.country ?? req.headers.get('x-vercel-ip-country') ?? 'Unknown'
  let city = req.geo?.city ?? req.headers.get('x-vercel-ip-city') ?? 'Unknown'

  if (country === 'Unknown' && (ip === '127.0.0.1' || ip === '::1')) {
    country = 'Localhost'
    city = 'Local'
  }

  const referrer = req.headers.get('referer') ?? 'Direct'

  // Generate visitorId hash
  const encoder = new TextEncoder()
  const data = encoder.encode(`${ip}-${userAgent}`)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const visitorId = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')

  // Extract Query Parameters (including UTMs)
  const queryParams = Object.fromEntries(req.nextUrl.searchParams.entries())

  // --- First-Touch Attribution ---
  // Only capture on the very first visit (when _ft cookie is absent)
  let firstTouch: Record<string, string> | null = null
  const hasFirstTouchCookie = req.cookies.has('_ft')

  if (!hasFirstTouchCookie) {
    let ftSource = queryParams.utm_source || ''
    let ftMedium = queryParams.utm_medium || ''
    let ftCampaign = queryParams.utm_campaign || ''
    let ftReferrer = ''

    try {
      if (referrer && referrer !== 'Direct') {
        const domain = new URL(referrer).hostname
        if (!domain.includes('mattiaastori.com') && !domain.includes('localhost')) {
          ftReferrer = domain
          // Auto-detect medium if no explicit UTM params
          if (!ftSource) {
            if (/instagram|facebook|twitter|x\.com|linkedin|pinterest|tiktok/.test(domain)) {
              ftSource = domain.split('.')[0]
              ftMedium = ftMedium || 'social'
            } else {
              ftSource = domain
              ftMedium = ftMedium || 'referral'
            }
          }
        }
      }
    } catch { }

    firstTouch = {
      source: ftSource || 'direct',
      medium: ftMedium || 'none',
      campaign: ftCampaign || '',
      referrer: ftReferrer || '',
      landingPage: path,
      date: new Date().toISOString().slice(0, 10),
    }
  }
  // --- End First-Touch Attribution ---

  const url = req.nextUrl.clone()
  url.pathname = '/api/track'

  const response = NextResponse.next()

  // Set the _ft cookie on the very first visit (1-year expiry)
  if (firstTouch) {
    response.cookies.set('_ft', JSON.stringify(firstTouch), {
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
      sameSite: 'lax',
      httpOnly: false,
    })
  }

  // Fire and forget tracking request
  event.waitUntil(
    fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        path,
        ip,
        country,
        city,
        referrer,
        visitorId,
        queryParams,
        firstTouch, // null for returning visitors — Redis already has their data
      }),
    }).catch((err) => console.error('Analytics track error:', err))
  )

  return response
}
