import Redis from 'ioredis'

const globalForRedis = global as unknown as { redis: Redis | undefined }

let redisInstance: Redis | undefined

function getRedis(): Redis {
  if (redisInstance) {
    return redisInstance
  }

  if (globalForRedis.redis) {
    redisInstance = globalForRedis.redis
    return redisInstance
  }

  // Only create connection when actually needed
  const newRedis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
    // Prevent connection during build
    lazyConnect: true,
    maxRetriesPerRequest: 3,
    retryStrategy(times) {
      if (times > 3) {
        return null // Stop retrying
      }
      return Math.min(times * 50, 2000)
    }
  })

  // Connect immediately after creation
  newRedis.connect().catch(err => {
    console.error('Redis connection error:', err)
  })

  if (process.env.NODE_ENV !== 'production') {
    globalForRedis.redis = newRedis
  }

  redisInstance = newRedis
  return redisInstance
}

// Export a Proxy that lazily initializes Redis
export const redis = new Proxy({} as Redis, {
  get(target, prop) {
    const instance = getRedis()
    const value = instance[prop as keyof Redis]
    if (typeof value === 'function') {
      return value.bind(instance)
    }
    return value
  }
})

