// In-memory storage for rate limiting
const store = new Map();
const expirationTimeouts = new Map();

const redis = {
  async incr(key) {
    const current = store.get(key) || 0;
    store.set(key, current + 1);
    return current + 1;
  },
  async expire(key, seconds) {
    if (expirationTimeouts.has(key)) {
      clearTimeout(expirationTimeouts.get(key));
    }
    const timeout = setTimeout(() => {
      store.delete(key);
      expirationTimeouts.delete(key);
    }, seconds * 1000);
    expirationTimeouts.set(key, timeout);
    return true;
  },
  async get(key) {
    return store.get(key);
  },
  async set(key, value, _mode, duration) {
    store.set(key, value);
    if (duration) {
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
    if (expirationTimeouts.has(key)) {
      clearTimeout(expirationTimeouts.get(key));
      expirationTimeouts.delete(key);
    }
    store.delete(key);
    return 1;
  }
};

// Helper for rate limiting
async function rateLimit({ key, limit, duration }) {
  const count = await redis.incr(key);
  if (count === 1) {
    await redis.expire(key, duration);
  }
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
