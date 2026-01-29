
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

async function verifyCities() {
    try {
        console.log('Verifying Top Cities Data (Last 7 Days)...');
        const dates = [
            '2026-01-20',
            '2026-01-19',
            '2026-01-18'
        ];

        for (const date of dates) {
            const cities = await redis.zrevrange(`analytics:cities:all:${date}`, 0, -1, 'WITHSCORES');
            console.log(`[${date}] Top Cities: ${cities.length > 0 ? cities : 'None'}`);
        }
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

verifyCities();
