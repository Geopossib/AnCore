import { Redis } from '@upstash/redis';

// Supports either naming convention Vercel's Redis Marketplace integrations
// use — Upstash's own env var names, or Vercel's generic KV_* aliases.
const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

export function getRedis() {
  if (!url || !token) {
    throw new Error(
      'Redis is not configured. Add a Redis integration (Upstash) to this project in the Vercel dashboard.'
    );
  }
  return new Redis({ url, token });
}
