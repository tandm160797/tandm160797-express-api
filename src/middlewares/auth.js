import jwt from 'jsonwebtoken';
import { passport } from './../helpers';

export const auth = async (req, res, next) => {
  let jwtToken = req.headers.authorization;
  const jwtSecretKey = process.env.JWT_SECRET_KEY || 'You are never KNOW!!!';

  if (jwtToken) {
    jwtToken = jwtToken.replace('Bearer ', '');
  }
  try {
    jwt.verify(jwtToken, jwtSecretKey);
    return passport.authenticate(
      'jwt',
      { session: false },
      (err, data, msg) => {
        if (err) {
          return next(err);
        }
        if (!data) {
          return res.status(401).json({
            stt: 'failure',
            msg,
            data: null
          });
        }
        return next();
      }
    )(req, res, next);
  } catch (err) {
    const jsonRes = {
      stt: 'failure',
      msg: '',
      data: null
    };
    switch (err.name) {
      case 'TokenExpiredError':
        jsonRes.msg = 'JWT token expired';
        break;
      case 'JsonWebTokenError':
        switch (err.message) {
          case 'jwt malformed':
            jsonRes.msg = 'JWT token malformed';
            break;
          case 'jwt must be provided':
            jsonRes.msg = 'JWT token must be provided';
            break;
          case 'invalid signature':
            jsonRes.msg = 'JWT token invalid signature';
            break;
        }
    }
    return res.status(401).json(jsonRes);
  }
};
