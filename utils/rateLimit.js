import LRU from 'lru-cache';

const rateLimit = (options) => {
  const tokenCache = new LRU({
    max: options.uniqueTokenPerInterval || 500,
    ttl: options.interval || 60000, // TTL in ms
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
