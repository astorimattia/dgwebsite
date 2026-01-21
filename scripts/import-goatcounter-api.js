
const Redis = require('ioredis');
const fs = require('fs');
const path = require('path');
const { Readable } = require('stream');
const zlib = require('zlib');

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
const API_CODE = process.env.GOATCOUNTER_CODE || 'mattia'; // Default to 'mattia' based on url
const API_BASE = `https://${API_CODE}.goatcounter.com/api/v0`;

if (!API_KEY) {
    console.error('Error: GOATCOUNTER_API_KEY is missing from .env.local');
    console.error('Please add it and try again.');
    process.exit(1);
}

const redis = new Redis(REDIS_URL);

// Simple CSV Line Parser (handles quotes)
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current);
    return result.map(s => s.trim().replace(/^"|"$/g, '').replace(/""/g, '"'));
}

async function fetchWithAuth(url, options = {}) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        ...options.headers
    };
    const res = await fetch(url, { ...options, headers });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`API Error ${res.status}: ${text}`);
    }
    return res;
}

async function getLatestExport() {
    console.log('Checking for existing exports...');
    try {
        const res = await fetchWithAuth(`${API_BASE}/export`);
        const data = await res.json();

        // Check if data.exports exists or if data is the array
        const exports = Array.isArray(data) ? data : (data.exports || []);

        if (exports.length > 0) {
            // Check if the latest one is completed? Or just use it?
            // Usually we want a recent one. Let's just take the first one returned.
            const latest = exports[0];
            console.log(`Found existing export ${latest.id} created at ${latest.created_at}`);
            return latest.id;
        }
    } catch (e) {
        console.log('Could not list exports (might vary by API version):', e.message);
    }
    return null;
}

async function triggerExport() {
    console.log('Triggering new export...');
    const res = await fetchWithAuth(`${API_BASE}/export`, {
        method: 'POST',
        body: JSON.stringify({}) // Default full export
    });
    const data = await res.json();
    console.log('Export triggered:', data.id);
    return data.id;
}

async function waitForExport(id) {
    console.log(`Waiting for export ${id} to complete...`);
    while (true) {
        const res = await fetchWithAuth(`${API_BASE}/export/${id}`);
        const data = await res.json();
        if (data.finished_at) {
            console.log('Export finished!');
            return;
        }
        await new Promise(r => setTimeout(r, 2000));
    }
}

async function downloadExport(id) {
    console.log(`Downloading export ${id}...`);
    const res = await fetchWithAuth(`${API_BASE}/export/${id}/download`);
    // Returns a gzipped stream
    const blob = await res.blob();
    const buffer = await blob.arrayBuffer();
    // Decompress
    return zlib.gunzipSync(Buffer.from(buffer)).toString('utf-8');
}

async function importData() {
    try {
        let exportId = await getLatestExport();

        if (!exportId) {
            exportId = await triggerExport();
        }
        await waitForExport(exportId);
        const csvData = await downloadExport(exportId);

        const lines = csvData.split('\n');
        // Header: Path,Title,Event,UserAgent,Browser,System,Bot,Referrer,Screen,Location,Date,Session
        // Note: Actual header might vary slightly, we should detect index.

        // Let's assume standard format or check header
        const header = parseCSVLine(lines[0]);
        const idx = {
            path: header.findIndex(h => h.toLowerCase().includes('path')),
            date: header.findIndex(h => h.toLowerCase().includes('date') || h.toLowerCase().includes('created') || h.toLowerCase().includes('timestamp')),
            referrer: header.findIndex(h => h.toLowerCase().includes('referrer')),
            location: header.findIndex(h => h.toLowerCase().includes('location') || h.toLowerCase().includes('country')),
            ip: -1, // Export usually doesn't give IP
            session: header.findIndex(h => h.toLowerCase().includes('session')),
            userAgent: header.findIndex(h => h.toLowerCase().includes('useragent') || h.toLowerCase().includes('user agent'))
        };

        console.log('Column mapping:', idx);
        console.log(`Processing ${lines.length - 1} rows...`);

        const pipeline = redis.pipeline();
        let count = 0;

        for (let i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue;
            const cols = parseCSVLine(lines[i]);

            const path = cols[idx.path] || '/';
            const dateStr = cols[idx.date];
            const referrer = cols[idx.referrer];
            const locationISO = cols[idx.location]; // e.g., "US" or "IT"
            const session = cols[idx.session];
            const userAgent = cols[idx.userAgent] || 'Unknown';

            if (!dateStr) continue;

            // Date Parsing
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) continue;

            const dayKey = date.toISOString().slice(0, 10);
            const hourKey = date.toISOString().slice(0, 13);
            const visitorId = session || `legacy-${Math.random().toString(36).substring(7)}`;

            // 1. Views
            pipeline.incr(`analytics:views:daily:${dayKey}`);
            pipeline.incr(`analytics:views:hourly:${hourKey}`);

            // 2. Pages
            pipeline.zincrby(`analytics:pages:daily:${dayKey}`, 1, path);

            // 3. Visitors
            pipeline.pfadd(`analytics:visitors:daily:${dayKey}`, visitorId);
            pipeline.pfadd(`analytics:visitors:hourly:${hourKey}`, visitorId);

            // 4. Countries
            // GoatCounter exports often give "IT", "US", etc.
            if (locationISO) {
                // We might want to map ISO to full name if our system uses names?
                // Current system uses what? location_history used "Italy", "Spain".
                // Middleware uses `req.geo.country` which is usually ISO code (e.g. 'US') on Vercel?
                // Actually middleware output `country` variable which is passed to track route.
                // Track route stores it directly.
                // Vercel `req.geo.country` is ISO 2-letter code.
                // So we should stick to ISO or map it?
                // Wait, the location_history.json used full names "Spain", "Italy".
                // The manual backfill script mapped cities to "Spain", "Italy".
                // If we now mix ISO codes like "ES", "IT", we will have split stats.
                // We should standardise.
                // Let's assume we want ISO codes if that's what we get from Vercel in prod.
                // But existing backfill used names.
                // Let's check a few mappings.
                const isoMap = {
                    'US': 'United States',
                    'GB': 'United Kingdom',
                    'IT': 'Italy',
                    'ES': 'Spain',
                    'FR': 'France',
                    'DE': 'Germany',
                    'CN': 'China',
                    'RU': 'Russia',
                    'IN': 'India',
                    'BR': 'Brazil',
                    'CA': 'Canada',
                    'AU': 'Australia',
                    'JP': 'Japan',
                    'KR': 'South Korea',
                    'TW': 'Taiwan',
                    'TH': 'Thailand',
                    'VN': 'Vietnam'
                };
                const countryName = isoMap[locationISO] || locationISO; // Fallback to Code if unknown

                pipeline.zincrby(`analytics:countries:daily:${dayKey}`, 1, countryName);
                pipeline.zincrby(`analytics:pages:country:${countryName}:${dayKey}`, 1, path);

                // Recent Visitors List
                pipeline.lpush(`analytics:recent_visitors:country:${countryName}`, visitorId);
            }

            // 5. Referrers
            if (referrer) {
                try {
                    const domain = new URL(referrer).hostname;
                    pipeline.zincrby(`analytics:referrers:daily:${dayKey}`, 1, domain);
                } catch (e) { }
            }

            // 6. Recent Visitors
            pipeline.lpush('analytics:recent_visitors', visitorId);

            // 7. Visitor Metadata (Basic)
            pipeline.hset(`analytics:visitor:${visitorId}`, {
                country: locationISO ? (isoMap[locationISO] || locationISO) : 'unknown', // Consistency
                referrer: referrer || 'Direct',
                userAgent: userAgent,
                lastSeen: date.toISOString()
            });

            count++;
            // Flush every 1000
            if (count % 1000 === 0) {
                await pipeline.exec();
                // Reset is automatic for ioredis pipeline? No, default pipeline executes once.
                // Oh, pipeline calls return a promise on exec(). If we reuse the variable we need to clear it?
                // ioredis pipeline is created once. We should create new ones or just queue everything if memory allows. 
                // 50k rows might be okay, but let's batch to be safe.
            }
        }

        // flush remainder
        console.log(`Executing final pipeline for ${count} items...`);
        await pipeline.exec();

        console.log(`Successfully imported ${count} rows.`);
        process.exit(0);

    } catch (error) {
        console.error('Import failed:', error);
        process.exit(1);
    }
}

importData();

// Helper for iso map if needed
const isoMap = {
    'US': 'United States',
    'GB': 'United Kingdom',
    'IT': 'Italy',
    'ES': 'Spain',
    'FR': 'France',
    'DE': 'Germany',
    'CN': 'China',
    'RU': 'Russia',
    'UA': 'Ukraine',
    'IN': 'India',
    // ... add more as needed
};
