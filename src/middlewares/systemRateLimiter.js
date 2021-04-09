import rateLimit from 'express-rate-limit'

export const systemRateLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, 
    max: 15,
    message: 'System OverLoaded, 100 request exceeded in 24 hours', 
    headers: true,
  });