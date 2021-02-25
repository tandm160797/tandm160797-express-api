import Joi from 'joi';
import { User } from './../core/models';

export default class UserValidator {
  static async register(req, res, next) {
    const { body } = req;
    const schema = Joi.object({
      email: Joi.string().required().empty().min(6).max(32).messages({
        'any.required': 'Email required',
        'string.empty': 'Email empty',
        'string.min': 'Email min 6',
        'string.max': 'Email min 32'
      }),
      password: Joi.string().required().empty().min(6).max(32).messages({
        'any.required': 'Password required',
        'string.empty': 'Password empty',
        'string.min': 'Password min 6',
        'string.max': 'Password min 32'
      })
    }).options({ stripUnknown: true });
    const { error, value } = schema.validate(body);

    if (error) {
      return res.status(200).json({
        stt: 'failure',
        code: 400,
        msg: error.message
      });
    }

    const { email } = value;
    try {
      const user = await User.findOne({ email });
      if (user) {
        return res.status(200).json({
          stt: 'failure',
          code: 400,
          msg: 'Email exist'
        });
      }
    } catch (err) {
      return next(err);
    }
    return next();
  }
}
