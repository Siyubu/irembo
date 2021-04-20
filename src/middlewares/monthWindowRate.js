import client from '../config/redis_config'
import rateLimiter from '../helpers/rateLimit'

export const sms_month_window = (req, res, next) => { 
    const redisClient = client
    const WINDOW_SIZE_IN_HOURS = 24 * 30;
    const WINDOW_LOG_INTERVAL_IN_HOURS = 12;
    const MAX_WINDOW_REQUEST_COUNT = req.user.msms;
    const user = req.user.name;
    rateLimiter(WINDOW_SIZE_IN_HOURS,WINDOW_LOG_INTERVAL_IN_HOURS,MAX_WINDOW_REQUEST_COUNT,redisClient,user,res,next)
};

export const email_month_window = (req, res, next) => { 
  const redisClient = client
  const WINDOW_SIZE_IN_HOURS = 24 * 30;
  const WINDOW_LOG_INTERVAL_IN_HOURS = 12;  
  const MAX_WINDOW_REQUEST_COUNT = req.user.memail;
  const user = req.user.email;
  rateLimiter(WINDOW_SIZE_IN_HOURS,WINDOW_LOG_INTERVAL_IN_HOURS,MAX_WINDOW_REQUEST_COUNT,redisClient,user,res,next)
};