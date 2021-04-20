import rateLimiter from '../helpers/rateLimit'
import client from '../config/redis_config'

export const sms_same_time_window = (req, res, next) => { 

    const redisClient = client // client
    const WINDOW_SIZE_IN_HOURS = 24; // window time
    const WINDOW_LOG_INTERVAL_IN_HOURS = 1; //to track time stamp
    const MAX_WINDOW_REQUEST_COUNT = req.user.dsms; // client limit
    const user = req.user.name;
    rateLimiter(WINDOW_SIZE_IN_HOURS,WINDOW_LOG_INTERVAL_IN_HOURS,MAX_WINDOW_REQUEST_COUNT,redisClient,user,res,next)  
};

export const email_same_time_window = (req, res, next) => { 
  const redisClient = client
  const WINDOW_SIZE_IN_HOURS = 24;
  const WINDOW_LOG_INTERVAL_IN_HOURS = 1;  
  const MAX_WINDOW_REQUEST_COUNT = req.user.demail;
  const user = req.user.email;
  rateLimiter(WINDOW_SIZE_IN_HOURS,WINDOW_LOG_INTERVAL_IN_HOURS,MAX_WINDOW_REQUEST_COUNT,redisClient,user,res,next)

};