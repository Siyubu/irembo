
import client from '../config/redis_config'
import express from 'express';
import limiter from "express-limiter"
const app = express();
const rateLimit=limiter(app,client)

export const sms_same_time_window = rateLimit({
    path: '*',
    method: 'all',
    lookup:"user.email",
    expire: 60 * 1000, // 15 minutes
    total: 3,
    onRateLimited: function (req, res, next) {
        next({ message: 'Rate limit exceeded', status: 429 })
      }
  });
  //app.use("/api/", apiLimiter);
  
  export const sms_per_month_window = rateLimit({
    windowMs: 720 * 60 * 60 * 1000, // 30 days window
    max: 200,
    message:
      "Too many sms sent from this IP in this month, please try again next month"
  });