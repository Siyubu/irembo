import jwt from 'jsonwebtoken';
import client from '../config/redis_config';

const signAccessToken = (userInfo) => {
  try {
    const payload = {
      id: userInfo.id,
      email: userInfo.email,
      name: userInfo.name,
      dsms:userInfo.DsmsWindow,
      demail: userInfo.DemailWindow,
      msms: userInfo.MsmsWindow,
      memail: userInfo.MemailWindow
    };
    const token = jwt.sign({ payload }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' });
    client.set(payload.id, token);
    return token;
  } catch (error) {
    return error;
  }
};

export default signAccessToken;
