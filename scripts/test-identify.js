/* eslint-disable */
const fetch = require('node-fetch');

async function testIdentity() {
    const BASE_URL = 'http://localhost:3000'; // Assume running locally

    console.log('--- Testing Analytics & Identity ---');

    // 1. Simulate a page view (to generate a visitor ID implicitly? No, middleware handles that for browser)
    // For API test, we need to hit /api/track manually to simulate what middleware triggers, 
    // OR just assume middleware works and test /api/identify.
    // BUT middleware generates the visitorId hash.

    // Let's test the /api/identify endpoint directly first.
    // Note: changing IP/UA to match a "clean" visitor
    const headers = {
        'user-agent': 'TestRunner/1.0',
        'x-forwarded-for': '127.0.0.1'
    };

    console.log('1. Calling /api/identify using:', headers);
    try {
        const res = await fetch(`${BASE_URL}/api/identify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            body: JSON.stringify({ identity: 'TestUser_Verification' })
        });

        if (!res.ok) {
            console.error('Failed to identify:', await res.text());
            return;
        }

        const data = await res.json();
        console.log('Identification Success:', data);
        const visitorId = data.visitorId;

        if (!visitorId) {
            console.error('No visitorId returned!');
            return;
        }

        // 2. Now simulate a track event with that visitorId (which middleware usually does)
        // We can manually hit /api/track to verify it records correctly
        console.log('2. Calling /api/track with visitorId:', visitorId);

        const trackRes = await fetch(`${BASE_URL}/api/track`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                path: '/verification-test-page',
                country: 'Localhost',
                city: 'Local',
                visitorId: visitorId,
                ip: '127.0.0.1',
                userAgent: 'TestRunner/1.0'
            })
        });

        if (trackRes.ok) {
            console.log('Tracking Success');
        } else {
            console.error('Tracking Failed:', await trackRes.text());
        }

        console.log('--- Test Complete. Check Admin Dashboard for "TestUser_Verification" ---');

    } catch (err) {
        console.error('Error running test (is server running?):', err.message);
    }
}

testIdentity();
