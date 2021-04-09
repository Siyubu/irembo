import express from 'express';
import dotenv from 'dotenv';
import multipart from 'connect-multiparty';
import { systemRateLimiter } from './middlewares/systemRateLimiter';
import routes from './routes/index';
const multipartMiddleware = multipart();

dotenv.config();
const serverPort = process.env.PORT || 5000;
const app = express();
app.use(multipartMiddleware);
app.use(systemRateLimiter);
app.use('/api', routes);
app.listen(serverPort,console.log(`Server has started on port ${serverPort}`));
export default app;