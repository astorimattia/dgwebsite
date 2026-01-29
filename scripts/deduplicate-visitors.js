
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

async function deduplicate() {
    try {
        console.log('Deduplicating Recent Visitors...');

        // 1. Fetch all IDs
        const ids = await redis.lrange('analytics:recent_visitors', 0, -1);
        console.log(`Current list size: ${ids.length}`);

        if (ids.length === 0) process.exit(0);

        // 2. Filter duplicates (Keep First occurrence aka Most Recent)
        const seen = new Set();
        const uniqueIds = [];

        for (const id of ids) {
            if (!seen.has(id)) {
                seen.add(id);
                uniqueIds.push(id);
            }
        }

        console.log(`Unique visitors: ${uniqueIds.length}`);
        console.log(`Removed ${ids.length - uniqueIds.length} duplicates.`);

        // 3. Replace list
        if (uniqueIds.length < ids.length) {
            const pipeline = redis.pipeline();
            pipeline.del('analytics:recent_visitors');

            // lpush puts elements at the HEAD. 
            // uniqueIds[0] is most recent. uniqueIds[last] is oldest.
            // If we lpush uniqueIds[0], it goes to 0 (correct).
            // Then uniqueIds[1] goes to 0? No.
            // lpush(key, [a, b, c]) results in c, b, a (c at head).
            // Wait, lrange returns [recent, ..., old].
            // So uniqueIds is [recent, ..., old].
            // To restore order "recent at head", we want:
            // List: [recent, ..., old]
            // We should RPUSH if we iterate from recent to old?
            // Or LPUSH in reverse order (oldest first).

            const reversed = [...uniqueIds].reverse();
            // push old ... recent.
            // reversed[0] is old. -> pushed first. 
            // reversed[last] is recent -> pushed last (becomes head).

            // Batch push
            // ioredis lpush supports array? Yes. pipeline.lpush(key, ...args)
            // Or just one command.
            if (reversed.length > 0) {
                pipeline.lpush('analytics:recent_visitors', ...reversed);
            }

            await pipeline.exec();
            console.log('Successfully updated Recent Visitors list.');
        } else {
            console.log('No duplicates found.');
        }

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

deduplicate();
