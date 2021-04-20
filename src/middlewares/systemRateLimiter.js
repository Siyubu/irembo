import rateLimit from 'express-rate-limit'

export const systemRateLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // a day
    max: 25,
    message: 'System OverLoaded, 100 request exceeded in 24 hours', 
    headers: true,
  });