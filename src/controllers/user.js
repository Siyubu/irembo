import { User as _user } from '../database/models/index';
import dotenv from 'dotenv';
dotenv.config();
export default class UserController {

static async login(req, res) {
    const user = await _user.findOne({ where: { email: req.body.email } });
    if (!user) {
        res.status(404).json({
            status: 404,
            message: 'Sign Up First',
          });
    }
    res.status(200).json({
      status: 200,
      data:user,
      message: 'You are Logged in successfully',
    });
  }

  static async smsNotification(req, res) {

    const  {userId}  = req.params;
    console.log('******************************** ',userId)
    const user = await _user.findByPk(userId);
    // const { dataValues: user } = await _user.findByPk(userId);
    _user.update(
      { smsWindow:user.smsWindow +1},
      { where: { id: userId } }
    )
  
        res.status(200).json({
            status: 200,
            data:user.smsWindow
        })
      

  }

  static async emailNotification(req, res) {

    const  userId  = req.params.id;
    const { dataValues: user } = await _user.findByPk(userId);
    _user.update(
      { emailWindow:user.emailWindow +1},
      { where: { id: userId } }
    );

    // const user = await _user.findOne({ where: { email: req.body.email } });
    // if (!user) {
    //     res.status(404).json({
    //         status: 404,
    //         message: 'Sign Up First',
    //       });
    // }
    // res.status(200).json({
    //   status: 200,
    //   message: 'You are Logged in successfully',
    // });
  }
}