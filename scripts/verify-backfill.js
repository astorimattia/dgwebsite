
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
const TEST_DATE = '2025-06-20'; // Valencia
const TEST_DATE_2 = '2025-07-01'; // Brugherio (Lombardy -> Italy)
const TEST_DATE_3 = '2025-12-18'; // San Jose (Costa Rica)

async function verify() {
    try {
        // Check 1: Valencia Day
        const v_views = await redis.get(`analytics:views:daily:${TEST_DATE}`);
        const v_country_es = await redis.zscore(`analytics:countries:daily:${TEST_DATE}`, 'Spain');
        const v_city_val = await redis.zscore(`analytics:cities:Spain:${TEST_DATE}`, 'València');

        console.log(`[${TEST_DATE}] Views: ${v_views} (Expected > 0)`);
        console.log(`[${TEST_DATE}] Country 'Spain' Score: ${v_country_es} (Expected > 0)`);
        console.log(`[${TEST_DATE}] City 'València' Score: ${v_city_val} (Expected > 0)`);

        // Check 2: Brugherio Day
        const b_views = await redis.get(`analytics:views:daily:${TEST_DATE_2}`);
        const b_country_it = await redis.zscore(`analytics:countries:daily:${TEST_DATE_2}`, 'Italy');

        console.log(`[${TEST_DATE_2}] Views: ${b_views}`);
        console.log(`[${TEST_DATE_2}] Country 'Italy' Score: ${b_country_it}`);

        // Check 3: San Jose -> Costa Rica
        const s_country_cr = await redis.zscore(`analytics:countries:daily:${TEST_DATE_3}`, 'Costa Rica');
        console.log(`[${TEST_DATE_3}] Country 'Costa Rica' Score: ${s_country_cr} (Expected > 0)`);

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

verify();
