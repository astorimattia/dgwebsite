// Script to remove all localhost visitors from Redis
const Redis = require('ioredis');
const fs = require('fs');
const path = require('path');

// Load .env.local
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

const isLocalhost = (ip) => {
  if (!ip) return false;
  return ip === '127.0.0.1' ||
    ip === '::1' ||
    ip === 'localhost' ||
    ip.startsWith('192.168.') ||
    ip.startsWith('10.') ||
    ip.startsWith('172.16.') ||
    ip.startsWith('172.17.') ||
    ip.startsWith('172.18.') ||
    ip.startsWith('172.19.') ||
    ip.startsWith('172.20.') ||
    ip.startsWith('172.21.') ||
    ip.startsWith('172.22.') ||
    ip.startsWith('172.23.') ||
    ip.startsWith('172.24.') ||
    ip.startsWith('172.25.') ||
    ip.startsWith('172.26.') ||
    ip.startsWith('172.27.') ||
    ip.startsWith('172.28.') ||
    ip.startsWith('172.29.') ||
    ip.startsWith('172.30.') ||
    ip.startsWith('172.31.');
};

async function cleanupLocalhost() {
  console.log('🧹 Starting localhost cleanup...\n');

  try {
    // Get all visitor IDs from recent_visitors list
    const recentVisitors = await redis.lrange('analytics:recent_visitors', 0, -1);
    console.log(`Found ${recentVisitors.length} total visitors in recent_visitors list`);

    let removedCount = 0;
    const localhostVisitors = [];

    // Check each visitor
    for (const vid of recentVisitors) {
      const meta = await redis.hgetall(`analytics:visitor:${vid}`);
      if (meta && meta.ip && isLocalhost(meta.ip)) {
        localhostVisitors.push({ vid, ip: meta.ip });
        removedCount++;
      }
    }

    console.log(`\nFound ${removedCount} localhost visitors to remove:`);
    localhostVisitors.forEach(v => console.log(`  - ${v.vid} (${v.ip})`));

    if (removedCount === 0) {
      console.log('\n✅ No localhost visitors found. Database is clean!');
      await redis.quit();
      process.exit(0);
      return;
    }

    // Remove from recent_visitors list
    console.log('\n🗑️  Removing from recent_visitors list...');
    for (const { vid } of localhostVisitors) {
      await redis.lrem('analytics:recent_visitors', 0, vid);
    }

    // Also check country-specific lists
    console.log('🗑️  Checking country-specific lists...');
    const keys = await redis.keys('analytics:recent_visitors:country:*');
    for (const key of keys) {
      for (const { vid } of localhostVisitors) {
        await redis.lrem(key, 0, vid);
      }
    }

    // Remove from top visitors sorted sets
    console.log('🗑️  Removing from top visitors lists...');
    const topKeys = await redis.keys('analytics:visitors:top:*');
    for (const key of topKeys) {
      for (const { vid } of localhostVisitors) {
        await redis.zrem(key, vid);
      }
    }

    // Delete the visitor metadata
    console.log('🗑️  Removing visitor metadata...');
    for (const { vid } of localhostVisitors) {
      await redis.del(`analytics:visitor:${vid}`);
      await redis.del(`analytics:identity:${vid}`);
      // Also remove their page tracking keys
      const pageKeys = await redis.keys(`analytics:visitors:${vid}:pages:*`);
      if (pageKeys.length > 0) {
        await redis.del(...pageKeys);
      }
    }

    console.log(`\n✅ Successfully removed ${removedCount} localhost visitors!`);
    console.log('✅ Database cleanup complete!\n');

  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    process.exit(1);
  } finally {
    await redis.quit();
    process.exit(0);
  }
}

cleanupLocalhost();
