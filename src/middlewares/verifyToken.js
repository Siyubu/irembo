import jwt from "jsonwebtoken";
import client from "../config/redis_config";

const verifyAccessToken = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
   // return onError(res, 401, "Unauthorized");
   res.status(401).json({
    status: 401,
    message:"Unauthorized"
})
  }
  await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decod) => {
    if (error) {
      //return onError(res, 401, 'Token is incorrect or expired!');
      res.status(401).json({
        status: 401,
        message:"Token is incorrect or expired!"
    })
    }
    client.get(decod.payload.id, (err, val) => {
      if (decod.payload) {
        if (val) {
          req.user = decod.payload;
          return next();
        }
      }
    });
  });
};
export default verifyAccessToken;
