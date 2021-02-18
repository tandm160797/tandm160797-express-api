"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _helpers = require("./../helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const auth = async (req, res, next) => {
  let jwtToken = req.headers.authorization;
  const jwtSecretKey = process.env.JWT_SECRET_KEY;

  if (jwtToken) {
    jwtToken = jwtToken.replace('Bearer ', '');
  }

  try {
    _jsonwebtoken.default.verify(jwtToken, jwtSecretKey);

    return _helpers.passport.authenticate('jwt', {
      session: false
    }, (err, data, msg) => {
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
    })(req, res, next);
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

exports.auth = auth;