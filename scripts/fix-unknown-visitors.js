
const Redis = require('ioredis');
const fs = require('fs');
const path = require('path');

// Load env
try {
    const envConfig = fs.readFileSync(path.resolve(process.cwd(), '.env.local'), 'utf8');
    envConfig.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            let cleanValue = value.trim();
            if ((cleanValue.startsWith('"') && cleanValue.endsWith('"')) || (cleanValue.startsWith("'") && cleanValue.endsWith("'"))) {
                cleanValue = cleanValue.slice(1, -1);
            }
            process.env[key.trim()] = cleanValue;
        }
    });
} catch (e) { }

const redis = new Redis(process.env.REDIS_URL);

async function fixUnknowns() {
    try {
        console.log('Scanning Recent Visitors for Unknown locations...');
        // Get all recent visitors
        const ids = await redis.lrange('analytics:recent_visitors', 0, -1);
        console.log(`Checking ${ids.length} visitors...`);

        for (const id of ids) {
            const meta = await redis.hgetall(`analytics:visitor:${id}`);

            // Criteria: Country is Unknown AND IP exists and is valid
            if (meta.country === 'Unknown' && meta.ip && meta.ip !== 'Unknown' && meta.ip !== '127.0.0.1' && !meta.ip.startsWith('192.168.')) {

                try {
                    console.log(`Resolving IP ${meta.ip} for Visitor ${id.slice(0, 8)}...`);

                    // Use ip-api.com (Free, 45 req/min throttled if not careful)
                    const res = await fetch(`http://ip-api.com/json/${meta.ip}`);
                    if (!res.ok) {
                        console.error(`Failed to resolve IP: ${res.status}`);
                        continue;
                    }

                    const data = await res.json();

                    if (data.status === 'success') {
                        console.log(`  -> Resolved: ${data.city}, ${data.country}`);

                        await redis.hset(`analytics:visitor:${id}`, {
                            country: data.country,
                            city: data.city,
                            lat: data.lat,
                            lon: data.lon,
                            region: data.regionName
                        });

                        // Also update country tracking if needed?
                        // For now, just fixing the metadata display is enough for the user request.
                    } else {
                        console.log(`  -> API Failed: ${data.message}`);
                    }

                } catch (e) {
                    console.error('Resolution Error:', e.message);
                }

                // Rate limit (45/min = ~1.3s delay)
                await new Promise(r => setTimeout(r, 1500));
            }
        }

        console.log('Fix complete.');
        process.exit(0);

    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

fixUnknowns();
