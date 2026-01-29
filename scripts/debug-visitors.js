
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

async function inspectVisitors() {
    try {
        console.log('Inspecting Recent Visitors...');
        const ids = await redis.lrange('analytics:recent_visitors', 0, 20);

        if (ids.length === 0) {
            console.log('No recent visitors found.');
        } else {
            console.log(`Found ${ids.length} recent visitors. Inspecting top 10...`);
            for (const id of ids.slice(0, 10)) {
                const meta = await redis.hgetall(`analytics:visitor:${id}`);
                console.log(`ID: ${id}`, meta);
            }
        }
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

inspectVisitors();
