import Redis from 'ioredis';

// Initialize Redis client (use the REDIS_URL from environment variables)
// Fallback to a dummy implementation for development if no Redis URL is provided
let redis;

if (process.env.REDIS_URL) {
  redis = new Redis(process.env.REDIS_URL);
  
  redis.on('error', (err) => {
    console.error('Redis connection error:', err);
  });
  
  console.log('Redis client initialized');
} else {
  // Development fallback using an in-memory Map
  // Note: This is NOT suitable for production and only used when Redis is not configured
  console.warn('No REDIS_URL provided, using in-memory storage (NOT suitable for production)');
  
  const store = new Map();
  
  redis = {
    async incr(key) {
      const current = store.get(key) || 0;
      store.set(key, current + 1);
      return current + 1;
    },
    async expire(key, seconds) {
      setTimeout(() => {
        store.delete(key);
      }, seconds * 1000);
      return true;
    },
    async get(key) {
      return store.get(key);
    },
    async set(key, value, mode, duration) {
      store.set(key, value);
      if (duration) {
        setTimeout(() => {
          store.delete(key);
        }, duration * 1000);
      }
      return 'OK';
    },
    async del(key) {
      store.delete(key);
      return 1;
    }
  };
}

// Helper for rate limiting
export async function rateLimit({ key, limit, duration }) {
  const count = await redis.incr(key);
  
  // Set expiry for the key if it's the first request in the window
  if (count === 1) {
    await redis.expire(key, duration);
  }
  
  // Check if rate limit is exceeded
  return { 
    success: count <= limit,
    current: count,
    limit,
    remaining: Math.max(0, limit - count)
  };
}

export default redis; 