import Redis from 'ioredis'

const globalForRedis = global as unknown as { redis: Redis | undefined }

let redisInstance: Redis | undefined
let connectionPromise: Promise<void> | undefined

function getRedis(): Redis {
  if (redisInstance) {
    return redisInstance
  }

  if (globalForRedis.redis) {
    redisInstance = globalForRedis.redis
    return redisInstance
  }

  const redisUrl = process.env.REDIS_URL
  if (!redisUrl) {
    console.error('REDIS_URL environment variable is not set')
    throw new Error('REDIS_URL environment variable is required')
  }

  // Only create connection when actually needed
  const newRedis = new Redis(redisUrl, {
    // Prevent connection during build
    lazyConnect: true,
    maxRetriesPerRequest: 3,
    connectTimeout: 10000, // 10 second timeout
    commandTimeout: 5000, // 5 second command timeout
    retryStrategy(times) {
      if (times > 3) {
        console.error(`Redis retry limit reached after ${times} attempts`)
        return null // Stop retrying
      }
      const delay = Math.min(times * 50, 2000)
      console.log(`Redis retry attempt ${times}, waiting ${delay}ms`)
      return delay
    },
    reconnectOnError(err) {
      console.error('Redis reconnect on error:', err.message)
      return true
    }
  })

  // Add event listeners for better debugging
  newRedis.on('connect', () => {
    console.log('Redis: Connected')
  })

  newRedis.on('ready', () => {
    console.log('Redis: Ready')
  })

  newRedis.on('error', (err) => {
    console.error('Redis error:', err.message)
  })

  newRedis.on('close', () => {
    console.log('Redis: Connection closed')
  })

  newRedis.on('reconnecting', () => {
    console.log('Redis: Reconnecting...')
  })

  // Connect immediately after creation and track the promise
  connectionPromise = newRedis.connect().catch(err => {
    console.error('Redis initial connection error:', err)
    throw err
  })

  if (process.env.NODE_ENV !== 'production') {
    globalForRedis.redis = newRedis
  }

  redisInstance = newRedis
  return redisInstance
}

// Helper to ensure connection is ready
export async function ensureRedisConnection(): Promise<void> {
  const instance = getRedis()

  // Wait for initial connection if it's still pending
  if (connectionPromise) {
    await connectionPromise
  }

  // Check if connected - ioredis doesn't have a 'ready' status, check if we can ping
  try {
    await instance.ping()
    return
  } catch (err) {
    // Connection not ready, try to reconnect
    console.log('Redis ping failed, attempting to reconnect...')
  }

  // If not connected, try to connect
  if (instance.status === 'end' || instance.status === 'close') {
    await instance.connect()
  }

  // Verify connection with ping
  try {
    await instance.ping()
  } catch (err) {
    throw new Error(`Redis connection failed: ${err instanceof Error ? err.message : 'Unknown error'}`)
  }
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

