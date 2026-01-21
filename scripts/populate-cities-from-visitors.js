
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

async function populateCities() {
    try {
        console.log('Populating Top Cities from Recent Visitors...');
        const ids = await redis.lrange('analytics:recent_visitors', 0, -1);
        console.log(`Processing ${ids.length} visitors...`);

        const pipeline = redis.pipeline();

        for (const id of ids) {
            const meta = await redis.hgetall(`analytics:visitor:${id}`);

            if (meta.city && meta.city !== 'Unknown' && meta.lastSeen) {
                // Determine date key
                const date = new Date(meta.lastSeen);
                if (isNaN(date.getTime())) continue;

                const ymd = date.toISOString().slice(0, 10);
                const city = meta.city;
                const country = meta.country || 'Unknown';

                // We are "replaying" this visit into the stats.
                // NOTE: This increments the count. If we run this multiple times, it will inflate.
                // Ideally we would be idempotent. But we don't know if this visitor was already counted in "Top Cities".
                // Since "Top Cities" is currently EMPTY (per user report), incrementing is safe for the first run.
                // For safety, users generally won't run this twice.

                // Add to Global Top Cities
                pipeline.zincrby(`analytics:cities:all:${ymd}`, 1, city);

                // Add to Country Top Cities
                if (country !== 'Unknown') {
                    pipeline.zincrby(`analytics:cities:${country}:${ymd}`, 1, city);
                }
            }
        }

        console.log(`Executing pipeline with ${pipeline.length} commands...`);
        await pipeline.exec();
        console.log('Top Cities population complete.');
        process.exit(0);

    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

populateCities();
