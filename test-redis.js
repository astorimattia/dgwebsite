import { Redis } from 'ioredis';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
dotenv.config({ path: resolve(process.cwd(), '.env.local') });
const redis = new Redis(process.env.REDIS_URL);
async function check() {
  const keys = await redis.keys('analytics:pages:*');
  let found = false;
  for (const k of keys) {
    if (await redis.type(k) !== 'zset') continue;
    const items = await redis.zrange(k, 0, -1);
    for (const item of items) {
      if (item.includes('feed') || item.includes('/media/')) {
        console.log(`FOUND ${item} in ${k}!!!`);
        found = true;
      }
    }
  }
  if (!found) console.log("CLEAN. No /media/ or feed found.");
  redis.quit();
}
check().catch(e => { console.error(e); redis.quit(); });
