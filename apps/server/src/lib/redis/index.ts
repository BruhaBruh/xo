import { env } from '@/lib/env';
import { createClient, type RedisClientType } from 'redis';

const globalForRedis = globalThis as unknown as {
  redis: RedisClientType;
};

// eslint-disable-next-line import/no-mutable-exports
let redis: RedisClientType;

if (process.env.NODE_ENV === 'production') {
  redis = createClient({
    url: env.REDIS_URL,
  });
  redis.connect();
} else {
  if (!globalForRedis.redis) {
    globalForRedis.redis = createClient({
      url: env.REDIS_URL,
    });
    globalForRedis.redis.connect();
  }
  redis = globalForRedis.redis;
}

export { redis };
