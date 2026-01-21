
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

async function cleanup() {
    try {
        console.log('Scanning for analytics keys...');
        let cursor = '0';
        let keys = [];

        do {
            const [nextCursor, result] = await redis.scan(cursor, 'MATCH', 'analytics:*', 'COUNT', 100);
            cursor = nextCursor;
            keys.push(...result);
        } while (cursor !== '0');

        console.log(`Found ${keys.length} keys to delete.`);

        if (keys.length > 0) {
            // Delete in chunks of 500
            for (let i = 0; i < keys.length; i += 500) {
                const chunk = keys.slice(i, i + 500);
                await redis.del(...chunk);
            }
            console.log('Cleanup complete.');
        } else {
            console.log('No keys to delete.');
        }

        process.exit(0);

    } catch (error) {
        console.error('Cleanup failed:', error);
        process.exit(1);
    }
}

cleanup();
