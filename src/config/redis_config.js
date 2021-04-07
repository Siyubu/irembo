import redis from 'redis';

const REDIS_PORT = process.env.REDIS_URL || 6379;
let client = redis.createClient(REDIS_PORT);

if (process.env.REDIS_URL) {
  client = redis.createClient(process.env.REDIS_URL);
}

export default client;