import { LRUCache } from 'lru-cache';

const rateLimit = (options) => {
  const tokenCache = new LRUCache({
    max: options.uniqueTokenPerInterval || 500,
    ttl: options.interval || 60000, // ms
  });

  return {
    check: (res, limit, token) => {
      const tokenCount = tokenCache.get(token) || 0;
      if (tokenCount >= limit) {
        res.status(429).json({ error: 'Rate limit exceeded' });
        return false;
      }
      tokenCache.set(token, tokenCount + 1);
      return true;
    },
  };
};

export default rateLimit;
