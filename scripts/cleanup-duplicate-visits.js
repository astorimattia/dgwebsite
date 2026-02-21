// Cleanup: remove burst duplicates from analytics:recent_visitors
// Handles both old format (visitorId) and new format (visitorId|timestamp)
// Strategy: within any 60-second window, the same visitor should appear at most once.
// For old-format entries (no timestamp), fall back to consecutive-dedup only.

require('dotenv').config({ path: '.env.local' });
const Redis = require('ioredis');

const redis = new Redis(process.env.REDIS_URL, {
  tls: process.env.REDIS_URL?.startsWith('rediss://') ? {} : undefined,
  maxRetriesPerRequest: 3,
});

const BURST_WINDOW_MS = 60 * 1000; // 60 seconds

function parseEntry(entry) {
  const pipeIdx = entry.lastIndexOf('|');
  if (pipeIdx !== -1) {
    const ts = parseInt(entry.slice(pipeIdx + 1), 10);
    return { vid: entry.slice(0, pipeIdx), ts: isNaN(ts) ? null : ts, raw: entry };
  }
  return { vid: entry, ts: null, raw: entry };
}

async function cleanup() {
  const key = 'analytics:recent_visitors';

  console.log('Fetching all entries from recent_visitors...');
  const allEntries = await redis.lrange(key, 0, -1);
  console.log(`Total entries before cleanup: ${allEntries.length}`);

  const parsed = allEntries.map(parseEntry);

  // Pass 1: Remove consecutive duplicates (handles old-format entries too)
  const afterConsec = [];
  for (const entry of parsed) {
    const last = afterConsec[afterConsec.length - 1];
    if (!last || last.vid !== entry.vid) {
      afterConsec.push(entry);
    }
  }
  console.log(`After consecutive dedup: ${afterConsec.length} (removed ${parsed.length - afterConsec.length})`);

  // Pass 2: For timestamped entries, remove bursts where the same visitor
  // appears more than once within a 60-second window
  // The list is newest-first, so we walk forward (index 0 = newest)
  const afterBurst = [];
  // Track last kept timestamp per visitor
  const lastKept = new Map(); // vid -> ts

  for (const entry of afterConsec) {
    if (entry.ts === null) {
      // No timestamp — keep it (old format, already consecutive-deduped)
      afterBurst.push(entry);
      continue;
    }

    const prev = lastKept.get(entry.vid);
    if (prev === undefined) {
      // First occurrence of this visitor — keep
      afterBurst.push(entry);
      lastKept.set(entry.vid, entry.ts);
    } else {
      // Check time difference (list is newest-first, so prev.ts >= entry.ts)
      const diff = Math.abs(prev - entry.ts);
      if (diff < BURST_WINDOW_MS) {
        // Same visitor within 60s — skip (it's a burst duplicate)
        continue;
      }
      afterBurst.push(entry);
      lastKept.set(entry.vid, entry.ts);
    }
  }

  const totalRemoved = allEntries.length - afterBurst.length;
  console.log(`After burst dedup: ${afterBurst.length} (removed ${afterBurst.length - afterConsec.length} burst dups)`);
  console.log(`Total removed: ${totalRemoved}`);

  if (totalRemoved === 0) {
    console.log('Nothing to clean up.');
    redis.disconnect();
    return;
  }

  // Replace the list
  console.log('Writing cleaned list back to Redis...');
  const pipeline = redis.pipeline();
  pipeline.del(key);

  const rawCleaned = afterBurst.map(e => e.raw);
  const chunkSize = 500;
  for (let i = 0; i < rawCleaned.length; i += chunkSize) {
    pipeline.rpush(key, ...rawCleaned.slice(i, i + chunkSize));
  }

  await pipeline.exec();
  console.log('Done!');

  // Also report top visitors by count in the cleaned list
  const counts = {};
  for (const e of afterBurst) {
    counts[e.vid] = (counts[e.vid] || 0) + 1;
  }
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5);
  console.log('\nTop 5 visitors after cleanup:');
  top.forEach(([vid, count]) => console.log(`  ${vid.slice(0, 16)}... : ${count} entries`));

  redis.disconnect();
}

cleanup().catch((err) => {
  console.error('Cleanup failed:', err);
  redis.disconnect();
  process.exit(1);
});
