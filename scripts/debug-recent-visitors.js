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

async function debug() {
    try {
        console.log('Fetching recent visitors...');
        const recentVisitorIds = await redis.lrange('analytics:recent_visitors', 0, 19);

        console.log(`Found ${recentVisitorIds.length} recent visitors.`);

        for (const id of recentVisitorIds) {
            const meta = await redis.hgetall(`analytics:visitor:${id}`);
            console.log(`Visitor ${id}:`, meta);
        }

        process.exit(0);
    } catch (error) {
        console.error('Debug failed:', error);
        process.exit(1);
    }
}

debug();
