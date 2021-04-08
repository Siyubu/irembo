import client from '../config/redis_config'
import rateLimit  from 'express-rate-limit'
import moment from 'moment';

const redisClient = client

const rateLimiter = (WINDOW_SIZE_IN_HOURS,WINDOW_LOG_INTERVAL_IN_HOURS,MAX_WINDOW_REQUEST_COUNT)=>{
    return (req, res, next) => { 
      try {
        if (!redisClient) {
          throw new Error('Redis client does not exist!');
          process.exit(1);
        }
        redisClient.get(req.user.email, function(err, record) {
          if (err) throw err;
          const currentRequestTime = moment();
          console.log(record);
          if (record == null) {
            let newRecord = [];
            let requestLog = {
              requestTimeStamp: currentRequestTime.unix(),
              requestCount: 1
            };
            newRecord.push(requestLog);
            redisClient.set(req.user.email, JSON.stringify(newRecord));
            next();
          }
          let data = JSON.parse(record);
          let windowStartTimestamp = moment()
            .subtract(WINDOW_SIZE_IN_HOURS, 'hours')
            .unix();
          let requestsWithinWindow = data.filter(entry => {
            return entry.requestTimeStamp > windowStartTimestamp;
          });
          console.log('requestsWithinWindow', requestsWithinWindow);
          let totalWindowRequestsCount = requestsWithinWindow.reduce((accumulator, entry) => {
            return accumulator + entry.requestCount;
          }, 0);
          if (totalWindowRequestsCount >= MAX_WINDOW_REQUEST_COUNT) {
            res
              .status(429)
              .send(
                `You have exceeded the ${MAX_WINDOW_REQUEST_COUNT} requests in ${WINDOW_SIZE_IN_HOURS} hrs limit!`
              );
          } else {
            let lastRequestLog = data[data.length - 1];
            let potentialCurrentWindowIntervalStartTimeStamp = currentRequestTime
              .subtract(WINDOW_LOG_INTERVAL_IN_HOURS, 'hours')
              .unix();
            if (lastRequestLog.requestTimeStamp > potentialCurrentWindowIntervalStartTimeStamp) {
              lastRequestLog.requestCount++;
              data[data.length - 1] = lastRequestLog;
            } else {
              data.push({
                requestTimeStamp: currentRequestTime.unix(),
                requestCount: 1
              });
            }
            redisClient.set(req.user.email, JSON.stringify(data));
            next();
          }
        });
      } catch (error) {
        next(error);
      }

    }
    
}
export default rateLimiter