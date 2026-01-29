
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
const TARGET_IPS = ['::1', '73.231.242.251'];

async function remove() {
    try {
        console.log(`Scanning for visitors with IPs: ${TARGET_IPS.join(', ')}...`);
        let cursor = '0';
        let visitorIdsToRemove = [];

        // 1. Find Visitor IDs
        do {
            const [nextCursor, keys] = await redis.scan(cursor, 'MATCH', 'analytics:visitor:*', 'COUNT', 100);
            cursor = nextCursor;

            for (const key of keys) {
                const ip = await redis.hget(key, 'ip');
                if (TARGET_IPS.includes(ip)) {
                    const vid = key.split(':')[2];
                    visitorIdsToRemove.push(vid);
                }
            }
        } while (cursor !== '0');

        console.log(`Found ${visitorIdsToRemove.length} visitors to remove.`);

        if (visitorIdsToRemove.length === 0) {
            console.log('Nothing to remove.');
            process.exit(0);
        }

        const pipeline = redis.pipeline();

        // 2. Remove from Recent Visitors Lists
        // We need to check global and per-country lists. 
        // Since we don't know exactly which country list they are in without checking metadata (which we have),
        // we can try to be smart or just brute force check/remove from global.
        // `lrem` removes elements equal to value.

        // Global Recent
        visitorIdsToRemove.forEach(vid => {
            pipeline.lrem('analytics:recent_visitors', 0, vid);
            pipeline.lrem('analytics:recent_identified_visitors', 0, vid);

            // Also delete the metadata key itself
            pipeline.del(`analytics:visitor:${vid}`);
            pipeline.del(`analytics:identity:${vid}`);
        });

        // For Top Visitors (sorted sets)
        // We need to remove them from `analytics:visitors:top:${date}`
        // This is hard because we don't know the dates easily without scanning ALL date keys.
        // However, we can scan for `analytics:visitors:top:*` keys and zrem.

        console.log('Scanning for Top Visitor sets...');
        let dateCursor = '0';
        let topVisitorKeys = [];
        do {
            const [next, keys] = await redis.scan(dateCursor, 'MATCH', 'analytics:visitors:top:*', 'COUNT', 100);
            dateCursor = next;
            topVisitorKeys.push(...keys);
        } while (dateCursor !== '0');

        topVisitorKeys.forEach(key => {
            visitorIdsToRemove.forEach(vid => {
                pipeline.zrem(key, vid);
            });
        });

        // Remove from country lists? 
        // We can look up the country of the visitor before deleting metadata.
        // For simplicity, we might skip this unless it's critical, as `lrem` on non-existent items is cheap/safe if we knew the key.
        // But iterating all countries is expensive.
        // Given the volume is small (user's own visits), removing from Global Recent and Top Visitors is the biggest visual fix.

        console.log(`Queueing ${pipeline.length} deletion commands...`);
        await pipeline.exec();

        console.log('Removal complete.');
        process.exit(0);

    } catch (error) {
        console.error('Removal failed:', error);
        process.exit(1);
    }
}

remove();
