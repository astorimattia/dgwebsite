
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

async function fetchWithAuth(endpoint) {
    const res = await fetch(`${API_BASE}${endpoint}`, {
        headers: { 'Authorization': `Bearer ${API_KEY}` }
    });
    if (!res.ok) console.error(await res.text());
    return await res.json();
}

async function debug() {
    console.log('Fetching /stats/hits for last 7 days...');
    const END = new Date().toISOString().slice(0, 10);
    const START = new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10);

    // Check one day specifically?
    const today = END;

    const hits = await fetchWithAuth(`/stats/hits?start=${START}&end=${END}&daily=true`);
    const paths = hits.hits || [];

    let totalViews = 0;
    const dailyTotals = {};

    console.log(`Found ${paths.length} paths.`);

    paths.forEach(p => {
        if (p.path === '/' || p.path.includes('admin')) console.log(`Path: ${p.path} | Total in range: ${p.count}`);

        if (p.stats) {
            p.stats.forEach(d => {
                const date = d.day;
                const count = d.daily;
                dailyTotals[date] = (dailyTotals[date] || 0) + count;
                totalViews += count;

                if (date === today) {
                    console.log(`  [${today}] ${p.path}: ${count}`);
                }
            });
        }
    });

    console.log('\nCALCULATED DAILY TOTALS:');
    console.table(dailyTotals);
}

debug();
