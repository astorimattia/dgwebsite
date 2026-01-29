
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

const API_KEY = process.env.GOATCOUNTER_API_KEY;
const API_CODE = process.env.GOATCOUNTER_CODE || 'mattia';
const API_BASE = `https://${API_CODE}.goatcounter.com/api/v0`;

if (!API_KEY) {
    console.error('Missing API Key');
    process.exit(1);
}

async function fetchWithAuth(endpoint) {
    console.log(`Fetching ${endpoint}...`);
    const res = await fetch(`${API_BASE}${endpoint}`, {
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        }
    });
    if (!res.ok) {
        console.error(`Error ${res.status}:`, await res.text());
        return null;
    }
    return await res.json();
}

async function probe() {
    // 1. Check Total Stats (Daily granularity?)
    // Usually supports ?start=...&end=...&granularity=day
    const today = new Date().toISOString().slice(0, 10);
    const lastWeek = new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10);

    console.log(`--- Probing Total Views (${lastWeek} to ${today}) ---`);
    const total = await fetchWithAuth(`/stats/total?start=${lastWeek}&end=${today}&daily=true`);
    console.log('Total Response keys:', total ? Object.keys(total) : 'null');
    if (total) console.log('Sample:', JSON.stringify(total).slice(0, 150));

    // 2. Check Hits (Pages)
    console.log(`\n--- Probing Page Hits ---`);
    const hits = await fetchWithAuth(`/stats/hits?start=${lastWeek}&end=${today}`);
    console.log('Hits Response keys:', hits ? Object.keys(hits) : 'null');
    if (hits && hits.hits) console.log('First Hit:', hits.hits[0]);

    // 3. Check Locations (PLURAL)
    console.log(`\n--- Probing Locations Stats (Plural) ---`);
    const locations = await fetchWithAuth(`/stats/locations?start=${lastWeek}&end=${today}`);
    console.log('Locations Response keys:', locations ? Object.keys(locations) : 'null');
    if (locations) console.log('Sample:', JSON.stringify(locations).slice(0, 200));

    // 4. Check Top Refs
    console.log(`\n--- Probing Top Referrers ---`);
    const refs = await fetchWithAuth(`/stats/toprefs?start=${lastWeek}&end=${today}`);
    if (refs) console.log('Sample Refs:', JSON.stringify(refs).slice(0, 200));

}

probe();
