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
    '/((?!api|_next/static|_next/image|favicon.ico|assets|sw.js).*)',
  ],
}

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  if (req.method !== 'GET') {
    return NextResponse.next()
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? req.ip ?? '127.0.0.1'
  const userAgent = req.headers.get('user-agent') ?? 'unknown'
  const path = req.nextUrl.pathname

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

  const url = req.nextUrl.clone()
  url.pathname = '/api/track'

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
      }),
    }).catch((err) => console.error('Analytics track error:', err))
  )

  return NextResponse.next()
}
