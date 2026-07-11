import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// one Ratelimit instance per route, each with its own prefix + window
export const connectRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(1, '60 s'), // 1 request per IP per minute
  prefix: 'pixelstack:ratelimit:connect',
})

export const newsletterRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(1, '60 s'), // 1 request per IP per minute
  prefix: 'pixelstack:ratelimit:newsletter',
})

export const agentRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(1, '5 s'), // 1 request per IP per 5 seconds
  prefix: 'pixelstack:ratelimit:agent',
})
