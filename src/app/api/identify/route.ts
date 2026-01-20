
import { redis } from '@/lib/redis';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, identity } = body;
        const userIdentifier = email || identity;

        if (!userIdentifier) {
            return NextResponse.json({ error: 'Missing email or identity' }, { status: 400 });
        }

        // Reconstruct visitorId from request headers to ensure security/consistency
        // This matches the logic in middleware.ts
        const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? '127.0.0.1';
        const userAgent = req.headers.get('user-agent') ?? 'unknown';

        const encoder = new TextEncoder();
        const data = encoder.encode(`${ip}-${userAgent}`);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const visitorId = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

        // Store identity mapping
        // key: analytics:identity:{visitorId} -> value: email
        await redis.set(`analytics:identity:${visitorId}`, userIdentifier);

        // Also add to a set of known identities for easier lookup later if needed
        await redis.sadd('analytics:known_identities', userIdentifier);

        return NextResponse.json({ success: true, visitorId });
    } catch (error) {
        console.error('Identity tracking error:', error);
        return NextResponse.json({ error: 'Identity tracking failed' }, { status: 500 });
    }
}
