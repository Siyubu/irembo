import Router from 'express';
import User from '../controllers/user';
import {sms_same_time_window, sms_per_month_window} from '../middlewares/rateLimit'

const router = Router();

router.post("/login", User.login);
router.post("/sms/:userId",sms_same_time_window,sms_per_month_window,User.smsNotification);
router.post("/email/:userId", User.emailNotification);

export default router;