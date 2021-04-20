import { User as _user } from '../database/models/index';
import signAccessToken from '../helpers/jwt_helper';
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
    const token = await signAccessToken(user.dataValues);
    res.status(200).json({
      status: 200,
      accessToken:token,
      message: 'You Logged in successfully',
    });
  }
  static async smsNotification(req, res) {
    const { id: userId } = req.user;
    const user = await _user.findByPk(userId);   
        if(!user){
          res.status(404).json({
            status: 404,
            message:'No such user on our database'
        })
        }
        res.status(200).json({
          status: 200,
          message:'Processed'
      })
  }

  static async emailNotification(req, res) {
    const { id: userId } = req.user;
    const user = await _user.findByPk(userId);   
        if(!user){
          res.status(404).json({
            status: 404,
            message:'No such user on our database'
        })
        }
        res.status(200).json({
          status: 200,
          message:'Processed'
      })

  } 
}