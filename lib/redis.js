// Initialize a memory-based fallback for Redis
const store = new Map();
// Keep track of expiration timeouts to properly clean them up
const expirationTimeouts = new Map();

// Create a memory-based fallback implementation
const memoryFallback = {
  async incr(key) {
    const current = store.get(key) || 0;
    store.set(key, current + 1);
    return current + 1;
  },
  async expire(key, seconds) {
    // Clear any existing timeout to avoid memory leaks
    if (expirationTimeouts.has(key)) {
      clearTimeout(expirationTimeouts.get(key));
    }
    
    // Set new timeout
    const timeout = setTimeout(() => {
      store.delete(key);
      expirationTimeouts.delete(key);
    }, seconds * 1000);
    
    // Store the timeout reference for potential cleanup
    expirationTimeouts.set(key, timeout);
    
    return true;
  },
  async get(key) {
    return store.get(key);
  },
  async set(key, value, mode, duration) {
    store.set(key, value);
    
    if (duration) {
      // Handle timeout similar to expire method
      if (expirationTimeouts.has(key)) {
        clearTimeout(expirationTimeouts.get(key));
      }
      
      const timeout = setTimeout(() => {
        store.delete(key);
        expirationTimeouts.delete(key);
      }, duration * 1000);
      
      expirationTimeouts.set(key, timeout);
    }
    
    return 'OK';
  },
  async del(key) {
    // Clean up any existing timeout
    if (expirationTimeouts.has(key)) {
      clearTimeout(expirationTimeouts.get(key));
      expirationTimeouts.delete(key);
    }
    
    store.delete(key);
    return 1;
  }
};

// Initialize Redis client or use memory fallback
let redis;

try {
  // Try to import ioredis - this will fail if the package isn't installed
  const Redis = require('ioredis');
  
  if (process.env.REDIS_URL) {
    // If REDIS_URL is provided, use it
    redis = new Redis(process.env.REDIS_URL);
    
    redis.on('error', (err) => {
      console.error('Redis connection error:', err);
      console.warn('Falling back to in-memory storage');
      redis = memoryFallback;
    });
    
    // Log removed: Redis client initialized
  } else {
    // No REDIS_URL, use memory fallback
    console.warn('No REDIS_URL provided, using in-memory storage (NOT suitable for production)');
    redis = memoryFallback;
  }
} catch (err) {
  // ioredis package not available, use memory fallback
  console.warn('ioredis package not found, using in-memory storage fallback');
  redis = memoryFallback;
}

// Helper for rate limiting
async function rateLimit({ key, limit, duration }) {
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

module.exports = {
  redis,
  rateLimit
}; 