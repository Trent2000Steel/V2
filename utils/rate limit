// utils/rateLimit.js
const LRU = require('lru-cache');

export default function rateLimit({ interval, uniqueTokenPerInterval }) {
  const tokenCache = new LRU({
    max: uniqueTokenPerInterval || 500,
    ttl: interval || 60000, // 1 minute default
  });

  return {
    check: (res, limit, token) =>
      new Promise((resolve, reject) => {
        const tokenCount = tokenCache.get(token) || [0];
        if (tokenCount[0] === 0) {
          tokenCache.set(token, tokenCount);
        }
        tokenCount[0] += 1;

        const currentUsage = tokenCount[0];
        const isRateLimited = currentUsage > limit;
        res.setHeader('X-RateLimit-Limit', limit);
        res.setHeader('X-RateLimit-Remaining', Math.max(0, limit - currentUsage));

        return isRateLimited ? reject() : resolve();
      }),
  };
}
