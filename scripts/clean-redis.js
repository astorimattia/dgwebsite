import { Redis } from '@upstash/redis';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN,
});

async function cleanData() {
  console.log('Starting redis cleanup...');

  // 1. Clean Top Pages (Remove bot paths)
  const isBotPath = (path) => 
    path.includes('.php') || 
    path.includes('.txt') || 
    path.includes('.env') || 
    path.includes('.git') || 
    path.includes('.xml') || 
    path.startsWith('/wp-') || 
    path.startsWith('/api/') || 
    path.includes('txets');

  console.log('Scanning analytics:pages:* keys...');
  const pageStr = await redis.keys('analytics:pages:*');
  const pageKeys = Array.isArray(pageStr) ? pageStr : [pageStr]; // handle upstash quirk
  
  let pagesRemoved = 0;
  for (const key of pageKeys) {
    // Only process sorted sets
    const type = await redis.type(key);
    if (type !== 'zset') continue;

    const items = await redis.zrange(key, 0, -1);
    for (const item of items) {
      if (item && isBotPath(item)) {
        await redis.zrem(key, item);
        pagesRemoved++;
        console.log(`Removed bot path: ${item} from ${key}`);
      }
    }
  }

  // 2. Clean Top Referrers (Remove localhost and internal referrers)
  const isInternalReferrer = (ref) => 
    ref.includes('localhost') || 
    ref.includes('mattiaastori.com') ||
    ref === 'localhost:3000' ||
    ref === 'mattiaastori.com';

  console.log('Scanning analytics:referrers:* keys...');
  const refStr = await redis.keys('analytics:referrers:*');
  const refKeys = Array.isArray(refStr) ? refStr : [refStr];
  
  let refsRemoved = 0;
  for (const key of refKeys) {
    const type = await redis.type(key);
    if (type !== 'zset') continue;

    const items = await redis.zrange(key, 0, -1);
    for (const item of items) {
      if (item && isInternalReferrer(item)) {
        await redis.zrem(key, item);
        refsRemoved++;
        console.log(`Removed internal referrer: ${item} from ${key}`);
      }
    }
  }

  console.log(`Cleanup complete! Removed ${pagesRemoved} bot paths and ${refsRemoved} internal referrers.`);
}

cleanData().catch(console.error);
