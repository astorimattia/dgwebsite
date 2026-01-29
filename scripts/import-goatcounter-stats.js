
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

const REDIS_URL = process.env.REDIS_URL;
const API_KEY = process.env.GOATCOUNTER_API_KEY;
const API_CODE = process.env.GOATCOUNTER_CODE || 'mattia';
const API_BASE = `https://${API_CODE}.goatcounter.com/api/v0`;

if (!API_KEY) {
    console.error('Missing API Key');
    process.exit(1);
}

const redis = new Redis(REDIS_URL);

async function fetchWithAuth(endpoint, retries = 3) {
    const res = await fetch(`${API_BASE}${endpoint}`, {
        headers: { 'Authorization': `Bearer ${API_KEY}` }
    });

    if (res.status === 429) {
        if (retries > 0) {
            // Try to parse "try again in Xms" from text if simple enough, or just wait 1s
            // The error text was: rate limited exceeded; try again in 128.121719ms
            // Let's just wait 1000ms to be safe
            console.log(`Rate limit hit for ${endpoint}. Retrying in 1s...`);
            await new Promise(r => setTimeout(r, 1000));
            return fetchWithAuth(endpoint, retries - 1);
        }
    }

    if (!res.ok) {
        throw new Error(`API Error ${res.status}: ${await res.text()}`);
    }
    return await res.json();
}

async function importStats() {
    try {
        console.log('Starting Stats Import (Idempotent: Overwriting with correct values)...');

        const START_DATE = '2024-01-01'; // Range
        const END_DATE = new Date().toISOString().slice(0, 10);

        console.log(`Fetching stats from ${START_DATE} to ${END_DATE}...`);

        // 1. Process Page Hits (Views & Pages)
        console.log('Fetching /stats/hits...');
        let hitsData = await fetchWithAuth(`/stats/hits?start=${START_DATE}&end=${END_DATE}&daily=true`);

        const paths = hitsData.hits || [];
        console.log(`Found ${paths.length} paths to process.`);

        const dailyViews = {}; // date -> total views
        const dailyPages = {}; // date -> { path: count }

        for (const p of paths) {
            const pathName = p.path;
            if (p.stats && Array.isArray(p.stats)) {
                for (const dayStat of p.stats) {
                    const date = dayStat.day;
                    const count = dayStat.daily;

                    if (count > 0) {
                        // Aggregate Total Views
                        dailyViews[date] = (dailyViews[date] || 0) + count;

                        // Aggregate Pages
                        if (!dailyPages[date]) dailyPages[date] = {};
                        dailyPages[date][pathName] = count;
                    }
                }
            }
        }

        const pipeline = redis.pipeline();

        // Write Views (SET - Overwrite)
        for (const [date, count] of Object.entries(dailyViews)) {
            pipeline.set(`analytics:views:${date}`, count);
        }

        // Write Pages (ZADD - Overwrite score)
        for (const [date, pages] of Object.entries(dailyPages)) {
            for (const [pathName, count] of Object.entries(pages)) {
                pipeline.zadd(`analytics:pages:${date}`, count, pathName);
            }
        }

        // 2. Process Locations & Referrers
        // Locations/Referrers are fetched daily. API returns TOTAL for that day.
        // So ZADD is appropriate to set the score to exactly what API says.
        // However, we must be careful if we have multiple entries for same country?
        // API returns unique list [{id:'US', count:5}, {id:'IT', count:3}].
        // So ZADD is 100% correct.

        let currentDate = new Date(START_DATE);
        const end = new Date(END_DATE);

        console.log('Fetching daily stats for Locations and Referrers...');

        while (currentDate <= end) {
            const ymd = currentDate.toISOString().slice(0, 10);

            // Only fetch if we actually have views that day (optimization)
            if (dailyViews[ymd]) {
                try {
                    // Locations
                    const locData = await fetchWithAuth(`/stats/locations?start=${ymd}&end=${ymd}`);
                    if (locData && locData.stats) {
                        // Clears existing key first? 
                        // If we use ZADD, we update existing members. Old members remain.
                        // To be 100% clean, we should DEL first.
                        pipeline.del(`analytics:countries:${ymd}`);

                        for (const loc of locData.stats) {
                            const countryCode = loc.id;
                            const count = loc.count;
                            const isoMap = {
                                'US': 'United States', 'GB': 'United Kingdom', 'IT': 'Italy', 'ES': 'Spain',
                                'FR': 'France', 'DE': 'Germany', 'CN': 'China', 'RU': 'Russia', 'IN': 'India',
                                'BR': 'Brazil', 'CA': 'Canada', 'AU': 'Australia', 'JP': 'Japan', 'KR': 'South Korea',
                                'TW': 'Taiwan', 'TH': 'Thailand', 'VN': 'Vietnam'
                            };
                            const countryName = isoMap[countryCode] || countryCode;
                            pipeline.zadd(`analytics:countries:${ymd}`, count, countryName);
                        }
                    }

                    // Referrers
                    const refData = await fetchWithAuth(`/stats/toprefs?start=${ymd}&end=${ymd}`);
                    if (refData && refData.stats) {
                        pipeline.del(`analytics:referrers:${ymd}`);
                        for (const ref of refData.stats) {
                            const refName = ref.name || ref.id;
                            const count = ref.count;
                            let domain = refName;
                            try { domain = new URL(refName).hostname; } catch (e) { }
                            pipeline.zadd(`analytics:referrers:${ymd}`, count, domain);
                        }
                    }

                } catch (e) {
                    console.error(`Failed to fetch daily stats for ${ymd}:`, e.message);
                }

                await new Promise(r => setTimeout(r, 1000)); // Rate limit safety
            }

            if (pipeline.length > 500) {
                await pipeline.exec();
            }

            currentDate.setDate(currentDate.getDate() + 1);
        }

        console.log('Executing final pipeline...');
        await pipeline.exec();
        console.log('Stats import complete.');
        process.exit(0);

    } catch (error) {
        console.error('Import failed:', error);
        process.exit(1);
    }
}

importStats();
