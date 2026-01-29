const Redis = require('ioredis');
const fs = require('fs');
const path = require('path');

// Load env vars
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
} catch (e) {
    console.log('No .env.local found, assuming env vars set');
}

const redis = new Redis(process.env.REDIS_URL);

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function getIpLocation(ip) {
    try {
        const res = await fetch(`http://ipwho.is/${ip}`);
        if (!res.ok) return null;
        return await res.json();
    } catch (e) {
        return null;
    }
}

async function fixLocations() {
    try {
        console.log('Fetching recent visitors...');
        const recentVisitorIds = await redis.lrange('analytics:recent_visitors', 0, 999);

        console.log(`Scanning ${recentVisitorIds.length} recent visitors...`);

        let fixedCount = 0;
        let skippedCount = 0;

        for (const id of recentVisitorIds) {
            const meta = await redis.hgetall(`analytics:visitor:${id}`);

            if (!meta || !meta.ip || meta.ip === 'unknown' || meta.ip === '127.0.0.1' || meta.ip === '::1') {
                continue;
            }

            if (meta.country === 'Unknown' || !meta.country || meta.country === 'unknown') {
                // Determine if we should fix
                process.stdout.write(`Fixing visitor ${id} (IP: ${meta.ip})... `);

                // Small delay to be polite
                await sleep(100);

                const geo = await getIpLocation(meta.ip);

                if (geo && geo.success) {
                    console.log(`Resolved: ${geo.city}, ${geo.country}`);

                    const pipeline = redis.pipeline();

                    // 1. Update Visitor Metadata
                    pipeline.hset(`analytics:visitor:${id}`, {
                        country: geo.country,
                        city: geo.city
                    });

                    // 2. Update Stats if we have a date
                    if (meta.lastSeen) {
                        const date = new Date(meta.lastSeen);
                        const dayKey = date.toISOString().slice(0, 10); // YYYY-MM-DD

                        // Increment Country
                        pipeline.zincrby(`analytics:countries:${dayKey}`, 1, geo.country);

                        // Increment City
                        pipeline.zincrby(`analytics:cities:${geo.country}:${dayKey}`, 1, geo.city);
                        pipeline.zincrby(`analytics:cities:all:${dayKey}`, 1, geo.city);

                        // Add to country-specific recent list
                        pipeline.lpush(`analytics:recent_visitors:country:${geo.country}`, id);
                        pipeline.ltrim(`analytics:recent_visitors:country:${geo.country}`, 0, 1000);
                    }

                    await pipeline.exec();
                    fixedCount++;
                } else {
                    console.log(`Failed (API error or invalid IP)`);
                }
            } else {
                skippedCount++;
            }
        }

        console.log(`Finished! Fixed: ${fixedCount}, Skipped: ${skippedCount}`);
        process.exit(0);
    } catch (error) {
        console.error('Fix failed:', error);
        process.exit(1);
    }
}

fixLocations();
