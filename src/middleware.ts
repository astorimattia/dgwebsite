import { NextRequest, NextResponse, NextFetchEvent } from 'next/server'

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  if (req.method !== 'GET') {
    return NextResponse.next()
  }

  const ip = req.ip ?? '127.0.0.1'
  const userAgent = req.headers.get('user-agent') ?? 'unknown'
  const path = req.nextUrl.pathname
  const country = req.geo?.country ?? 'Unknown'
  const city = req.geo?.city ?? 'Unknown'
  const referrer = req.headers.get('referer') ?? 'Direct'

  // Generate visitorId hash
  const encoder = new TextEncoder()
  const data = encoder.encode(`${ip}-${userAgent}`)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const visitorId = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')

  const url = req.nextUrl.clone()
  url.pathname = '/api/analytics/track'

  // Fire and forget tracking request
  event.waitUntil(
    fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        path,
        country,
        city,
        referrer,
        visitorId,
      }),
    }).catch((err) => console.error('Analytics track error:', err))
  )

  return NextResponse.next()
}
