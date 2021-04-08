import Router from 'express';
import User from '../controllers/user';
import verifyAccessToken from '../middlewares/verifyToken';
import {sms_same_time_window, email_same_time_window} from '../middlewares/sameWindowRateLimit'
import {sms_month_window,email_month_window} from '../middlewares/monthWindowRate'

const router = Router();

router.post("/login", User.login);
router.post("/day/sms/",verifyAccessToken,sms_same_time_window,User.smsNotification);
router.post("/day/email/",verifyAccessToken,email_same_time_window, User.emailNotification);
router.post("/month/sms/",verifyAccessToken,sms_month_window,User.smsNotification);
router.post("/month/email/",verifyAccessToken,email_month_window, User.emailNotification);

export default router;