
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

async function verifyRecent() {
    try {
        console.log('Verifying Recent Data (Last 7 Days)...');
        // get 2026-01-20 (today) and 2026-01-13 (7 days ago)

        const dates = [
            '2026-01-20',
            '2026-01-19',
            '2026-01-18',
            '2026-01-17',
            '2026-01-16',
            '2026-01-15',
            '2026-01-14'
        ];

        for (const date of dates) {
            const views = await redis.get(`analytics:views:${date}`);
            const visitors = await redis.pfcount(`analytics:visitors:${date}`);
            const topPage = await redis.zrevrange(`analytics:pages:${date}`, 0, 0, 'WITHSCORES');

            console.log(`[${date}] Views: ${views || 0} | Visitors: ${visitors} | Top Page: ${topPage}`);
        }
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

verifyRecent();
