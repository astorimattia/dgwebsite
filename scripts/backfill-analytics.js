
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

const DATA_FILE = path.join(__dirname, '../src/data/location_history.json');

// Manual mapping for cities to countries based on the history file
const CITY_TO_COUNTRY = {
    'València': 'Spain',
    'Spain': 'Spain', // Sometimes city is country
    'Brugherio': 'Italy',
    'Lombardy': 'Italy',
    'Tbilisi': 'Georgia',
    'Moscow': 'Russia',
    'Moscow Oblast': 'Russia',
    'Republic of Tatarstan': 'Russia',
    'Crimea': 'Ukraine', // De facto control varies, but following UN standard or just keeping it specific
    'Chongqing': 'China',
    'Xining': 'China',
    'Urumqi': 'China',
    'Altay': 'China',
    'Karamay': 'China',
    'Bortala': 'China',
    'Ili': 'China',
    'Busan': 'South Korea',
    '부산광역시': 'South Korea', // Busan
    'South Korea': 'South Korea',
    '서울특별시': 'South Korea', // Seoul
    'NJ': 'United States',
    'Newark': 'United States',
    'New York': 'United States',
    'United States': 'United States',
    'New Delhi': 'India',
    'India': 'India',
    'Chhattisgarh': 'India',
    'Andhra Pradesh': 'India',
    'Telangana': 'India',
    'Maharashtra': 'India',
    'Nagpur': 'India',
    'Bhopal': 'India',
    'Agra': 'India',
    'Jammu': 'India',
    'Srinagar': 'India',
    'Bang Rak District': 'Thailand',
    'Mueang Phuket District': 'Thailand',
    'Hanoi': 'Vietnam',
    'Shenzhen': 'China',
    'Xinxing District': 'Taiwan', // Kaohsiung
    'Lingya District': 'Taiwan', // Kaohsiung
    'Kaohsiung City': 'Taiwan',
    'Taichung City': 'Taiwan',
    'Taipei City': 'Taiwan',
    'Yilan County': 'Taiwan',
    'Hualien County': 'Taiwan',
    'Taitung County': 'Taiwan',
    'CA': 'United States',
    'San Francisco': 'United States',
    'Orlando': 'United States',
    'San Jose': 'Costa Rica', // Could be CA, but next entries are Puntarenas/La Cruz -> Costa Rica
    'Puntarenas': 'Costa Rica',
    'La Cruz': 'Costa Rica',
    'Tola': 'Nicaragua',
    'Altagracia': 'Nicaragua',
    'Chiltiupán': 'El Salvador',
    'Granada': 'Nicaragua',
    'Guadalajara': 'Mexico',
    'Jocoro': 'El Salvador',
    'Tamanique': 'El Salvador',
    'Teotepeque': 'El Salvador',
    'Tlajomulco de Zúñiga': 'Mexico',
    'Villa Nueva': 'Guatemala'
};

async function backfill() {
    try {
        const rawData = fs.readFileSync(DATA_FILE, 'utf8');
        const history = JSON.parse(rawData);

        console.log(`Found ${history.length} history entries to process...`);

        const pipeline = redis.pipeline();
        let processedCount = 0;

        for (const entry of history) {
            if (!entry.date || !entry.city) continue;

            const date = new Date(entry.date);
            const dayKey = date.toISOString().slice(0, 10); // YYYY-MM-DD
            const hourKey = date.toISOString().slice(0, 13); // YYYY-MM-DDTHH

            const city = entry.city;
            // Infer country
            let country = CITY_TO_COUNTRY[city] || 'Unknown';

            // Special logic for ambiguous cities if needed
            if (city === 'San Jose' && history.some(e => e.city === 'Puntarenas' && Math.abs(new Date(e.date) - date) < 86400000 * 2)) {
                country = 'Costa Rica';
            } else if (city === 'San Jose') {
                // Default to Costa Rica based on context of lists, or US if close to SF
                // In the provided list, San Jose appears between Orlando and Puntarenas. 
                // 2025-12-18 San Jose. 2025-12-19 Puntarenas. -> Costa Rica.
                country = 'Costa Rica';
            }

            // Visitor ID for backfilling - Use a consistent ID for "Mattia" or "Backfill"
            // We'll use a specific generated ID for "Mattia Owner" so it groups together
            const visitorId = 'mattia-backfill-id';

            // 1. Total Page Views
            // We'll assume at least 1 view per location log
            pipeline.incr(`analytics:views:daily:${dayKey}`);
            // pipeline.incr(`analytics:views:hourly:${hourKey}`); // Optional, maybe too much noise? lets do it.

            // 2. Unique Visitors
            pipeline.pfadd(`analytics:visitors:daily:${dayKey}`, visitorId);
            // pipeline.pfadd(`analytics:visitors:hourly:${hourKey}`, visitorId);

            // 3. Top Pages
            // Assume main page visit
            pipeline.zincrby(`analytics:pages:daily:${dayKey}`, 1, '/');
            pipeline.zincrby(`analytics:visitors:${visitorId}:pages:${dayKey}`, 1, '/');
            pipeline.zincrby(`analytics:visitors:top:${dayKey}`, 1, visitorId);

            // 4. Top Countries
            if (country !== 'Unknown') {
                pipeline.zincrby(`analytics:countries:daily:${dayKey}`, 1, country);

                // 4a. Top Cities per Country
                pipeline.zincrby(`analytics:cities:${country}:${dayKey}`, 1, city);

                // 4b. Global Top Cities
                pipeline.zincrby(`analytics:cities:all:${dayKey}`, 1, city);

                // 4c. Top Pages per Country
                pipeline.zincrby(`analytics:pages:country:${country}:${dayKey}`, 1, '/');

                // Add to recent visitors list
                pipeline.lpush('analytics:recent_visitors:country:' + country, visitorId);
                pipeline.ltrim('analytics:recent_visitors:country:' + country, 0, 1000);
            }

            // Global Recent Visitors
            pipeline.lpush('analytics:recent_visitors', visitorId);
            pipeline.ltrim('analytics:recent_visitors', 0, 5000);

            // 5. Visitor Metadata (Overwrite with latest info for that day? Or just set once?)
            // We should probably set it so if we look up this visitor we see their "latest" info from backfill?
            // Actually, we can just log them to recent visitors.

            // Let's NOT overwrite the CURRENT live "mattia" visitor metadata if it exists, 
            // but we can ensure the ID is mapped.

            processedCount++;
        }

        // Also identify this visitor ID
        pipeline.set(`analytics:identity:${'mattia-backfill-id'}`, 'mattia@dgwebsite.com');
        pipeline.hset(`analytics:visitor:${'mattia-backfill-id'}`, {
            ip: 'Unknown',
            country: 'Unknown',
            city: 'Unknown',
            referrer: 'Direct',
            userAgent: 'LocationHistory',
            lastSeen: new Date().toISOString()
        });

        console.log(`Executing pipeline with ${pipeline.length} commands...`);
        await pipeline.exec();

        console.log(`Successfully backfilled ${processedCount} entries.`);
        process.exit(0);

    } catch (error) {
        console.error('Backfill failed:', error);
        process.exit(1);
    }
}

backfill();
