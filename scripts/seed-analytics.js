
const Redis = require('ioredis');


const fs = require('fs');
const path = require('path');

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

async function seed() {
  const today = new Date().toISOString().slice(0, 10);
  const currentHour = new Date().toISOString().slice(0, 13);

  console.log(`Seeding data for ${today}...`);

  const pipeline = redis.pipeline();

  // 1. Page Views
  pipeline.incrby(`analytics:views:${today}`, 50);
  pipeline.incrby(`analytics:views:${currentHour}`, 10);

  // 2. Visitors
  const visitors = ['v1', 'v2', 'v3', 'v4', 'v5'];
  visitors.forEach(v => {
    pipeline.pfadd(`analytics:visitors:${today}`, v);
    pipeline.pfadd(`analytics:visitors:${currentHour}`, v);
  });

  // 3. Top Pages
  pipeline.zincrby(`analytics:pages:${today}`, 20, '/');
  pipeline.zincrby(`analytics:pages:${today}`, 15, '/about');
  pipeline.zincrby(`analytics:pages:${today}`, 5, '/gallery');

  // 4. Countries
  pipeline.zincrby(`analytics:countries:${today}`, 30, 'US');
  pipeline.zincrby(`analytics:countries:${today}`, 10, 'IT');
  pipeline.zincrby(`analytics:countries:${today}`, 5, 'GB');

  // 5. Recent Visitors
  pipeline.lpush(`analytics:recent_visitors`, 'v1', 'v2', 'v3');

  // Metadata for v1
  pipeline.hset(`analytics:visitor:v1`, {
    ip: '192.168.1.1',
    country: 'US',
    city: 'New York',
    userAgent: 'SeedScript',
    lastSeen: new Date().toISOString()
  });

  await pipeline.exec();
  console.log('Seed complete.');
  process.exit(0);
}

seed().catch(console.error);
