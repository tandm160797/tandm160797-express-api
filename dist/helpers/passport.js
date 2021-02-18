"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _passportLocal = require("passport-local");

var _passportJwt = require("passport-jwt");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _models = require("./../core/models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const localOptions = {
  usernameField: 'email',
  passwordField: 'password'
};
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtExp = process.env.JWT_EXP || 24 * 60 * 60;
const jwtOptions = {
  secretOrKey: jwtSecretKey,
  jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken()
};

_passport.default.use(new _passportLocal.Strategy(localOptions, async (email, password, done) => {
  try {
    const user = await _models.User.findOne({
      email
    }).exec();

    if (!user) {
      return done(null, false, 'Email does not exist');
    }

    const validate = await user.verifyPassword(password);

    if (!validate) {
      return done(null, false, 'Wrong password');
    }

    const jwtToken = _jsonwebtoken.default.sign({
      id: user._id
    }, jwtSecretKey, {
      expiresIn: jwtExp
    });

    return done(null, {
      user,
      jwtToken
    }, 'Logged in successfully');
  } catch (err) {
    return done(err);
  }
}));

_passport.default.use(new _passportJwt.Strategy(jwtOptions, async (jwtPayload, done) => {
  try {
    const user = await _models.User.findById(jwtPayload.id).exec();

    if (!user) {
      return done(null, false, 'User does not exist');
    }

    return done(null, user, 'Authorized successfully');
  } catch (err) {
    return done(err);
  }
}));

var _default = _passport.default;
exports.default = _default;