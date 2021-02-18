import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import jwt from 'jsonwebtoken';
import { User } from './../core/models';

const localOptions = {
  usernameField: 'email',
  passwordField: 'password'
};
const jwtSecretKey = process.env.JWT_SECRET_KEY || 'You are never KNOW!!!';
const jwtExp = process.env.JWT_EXP || 24 * 60 * 60;
const jwtOptions = {
  secretOrKey: jwtSecretKey,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

passport.use(
  new LocalStrategy(localOptions, async (email, password, done) => {
    try {
      const user = await User.findOne({ email }).exec();
      if (!user) {
        return done(null, false, 'Email does not exist');
      }

      const validate = await user.verifyPassword(password);
      if (!validate) {
        return done(null, false, 'Wrong password');
      }

      const jwtToken = jwt.sign({ id: user._id }, jwtSecretKey, {
        expiresIn: jwtExp
      });
      return done(null, { user, jwtToken }, 'Logged in successfully');
    } catch (err) {
      return done(err);
    }
  })
);

passport.use(
  new JWTStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload.id).exec();
      if (!user) {
        return done(null, false, 'User does not exist');
      }
      return done(null, user, 'Authorized successfully');
    } catch (err) {
      return done(err);
    }
  })
);

export default passport;
