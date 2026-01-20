#!/usr/bin/env node

/**
 * Test Redis connection with the same configuration as the app
 */

const Redis = require('ioredis');

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  console.error('❌ REDIS_URL environment variable is not set');
  process.exit(1);
}

console.log('🔍 Testing Redis connection...');
console.log('📍 Redis URL:', redisUrl.replace(/:[^:@]+@/, ':****@')); // Hide password

const redis = new Redis(redisUrl, {
  lazyConnect: true,
  maxRetriesPerRequest: 3,
  connectTimeout: 10000,
  commandTimeout: 5000,
  retryStrategy(times) {
    if (times > 3) {
      console.error(`❌ Redis retry limit reached after ${times} attempts`);
      return null;
    }
    const delay = Math.min(times * 50, 2000);
    console.log(`🔄 Redis retry attempt ${times}, waiting ${delay}ms`);
    return delay;
  }
});

redis.on('connect', () => {
  console.log('✅ Redis: Connected');
});

redis.on('ready', () => {
  console.log('✅ Redis: Ready');
});

redis.on('error', (err) => {
  console.error('❌ Redis error:', err.message);
});

redis.on('close', () => {
  console.log('⚠️  Redis: Connection closed');
});

redis.on('reconnecting', () => {
  console.log('🔄 Redis: Reconnecting...');
});

async function test() {
  try {
    console.log('\n🚀 Attempting to connect...');
    await redis.connect();

    console.log('\n📊 Testing basic operations...');

    // Test PING
    const pong = await redis.ping();
    console.log('✅ PING:', pong);

    // Test SET/GET
    await redis.set('test:connection', 'success');
    const value = await redis.get('test:connection');
    console.log('✅ SET/GET:', value);

    // Test analytics keys
    const keys = await redis.keys('analytics:*');
    console.log('✅ Analytics keys found:', keys.length);

    // Test a sample analytics query
    const viewsToday = await redis.get('analytics:views:2026-01-19');
    console.log('✅ Views today:', viewsToday || '0');

    console.log('\n✅ All tests passed!');

    await redis.quit();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

test();
