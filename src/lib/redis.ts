import Redis from 'ioredis'

const globalForRedis = global as unknown as { redis: Redis | undefined }

function createRedis(): Redis {
  if (globalForRedis.redis) {
    return globalForRedis.redis
  }

  const redisUrl = process.env.REDIS_URL
  if (!redisUrl) {
    throw new Error('REDIS_URL environment variable is required')
  }

  const instance = new Redis(redisUrl, {
    maxRetriesPerRequest: 1,
    connectTimeout: 5000,
    commandTimeout: 5000,
    enableOfflineQueue: true,
    retryStrategy(times) {
      if (times > 2) return null
      return Math.min(times * 200, 1000)
    },
  })

  instance.on('error', (err) => {
    console.error('Redis error:', err.message)
  })

  globalForRedis.redis = instance
  return instance
}

export const redis = createRedis()

export async function ensureRedisConnection(): Promise<void> {
  if (redis.status === 'ready') return
  if (redis.status === 'end' || redis.status === 'close') {
    await redis.connect()
  }
  await redis.ping()
}
