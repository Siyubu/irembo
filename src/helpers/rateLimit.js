import moment from 'moment';
const rateLimiter = (WINDOW_SIZE_IN_HOURS,WINDOW_LOG_INTERVAL_IN_HOURS,MAX_WINDOW_REQUEST_COUNT,redisClient,user,res,next)=>{
      try {
        if (!redisClient) {
          throw new Error('Redis client does not exist!');
          process.exit(1);
        }
        redisClient.get(user, function(err, record) // fetch records of current user
        {
          if (err) throw err;
          const currentRequestTime = moment();
          console.log(record);
          if (record == null) //if no record is found , create a new record for user and store to redis
          {
            let newRecord = [];
            let requestLog = {
              requestTimeStamp: currentRequestTime.unix(),
              requestCount: 1
            };
            newRecord.push(requestLog);
            redisClient.set(user, JSON.stringify(newRecord));
            next();
          }
          else // if record is found, parse it's value and calculate number of requests users has made within the last window
          {
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
          if (totalWindowRequestsCount >= MAX_WINDOW_REQUEST_COUNT) // if number of requests made is greater than or equal to the desired maximum, return error
          {
            res
              .status(429)
              .send(
                `You have exceeded the ${MAX_WINDOW_REQUEST_COUNT} requests in ${WINDOW_SIZE_IN_HOURS} hrs limit!`
              );
          } else {
            let lastRequestLog = data[data.length - 1]; //if number of requests made is less than allowed maximum, log new entry
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
            redisClient.set(user, JSON.stringify(data));
            next();
          }
        }
        });
      } catch (error) {
        next(error);
      }
    
}
export default rateLimiter