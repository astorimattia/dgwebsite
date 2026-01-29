
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

async function analyze() {
    try {
        console.log('Scanning visitor keys...');
        let cursor = '0';
        let ipCounts = {};

        do {
            const [nextCursor, keys] = await redis.scan(cursor, 'MATCH', 'analytics:visitor:*', 'COUNT', 100);
            cursor = nextCursor;

            for (const key of keys) {
                const ip = await redis.hget(key, 'ip');
                if (ip) {
                    ipCounts[ip] = (ipCounts[ip] || 0) + 1;
                }
            }
        } while (cursor !== '0');

        console.log('\n--- IP Distribution ---');
        console.table(Object.entries(ipCounts).sort((a, b) => b[1] - a[1]));

        process.exit(0);

    } catch (error) {
        console.error('Analysis failed:', error);
        process.exit(1);
    }
}

analyze();
