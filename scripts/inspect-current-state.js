
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

async function inspect() {
    try {
        console.log('Inspecting Current State...');

        const ids = await redis.lrange('analytics:recent_visitors', 0, -1);
        console.log(`Total Recent Visitors: ${ids.length}`);

        // Check for duplicates
        const counts = {};
        ids.forEach(id => counts[id] = (counts[id] || 0) + 1);

        const duplicates = Object.entries(counts).filter(([id, count]) => count > 1);
        console.log(`Duplicate IDs found: ${duplicates.length}`);
        if (duplicates.length > 0) {
            console.log('Top duplicates:', duplicates.slice(0, 5));
        }

        // Check metadata for top 10
        console.log('\nTop 10 Visitors Metadata:');
        for (const id of ids.slice(0, 10)) {
            const meta = await redis.hgetall(`analytics:visitor:${id}`);
            console.log(`ID: ${id.slice(0, 8)}... | Country: ${meta.country} | City: ${meta.city} | IP: ${meta.ip}`);
        }

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

inspect();
