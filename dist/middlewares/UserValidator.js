"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _models = require("./../core/models");

var _response = require("./../helpers/response");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserValidator {
  static async register(req, res, next) {
    const {
      body
    } = req;

    const schema = _joi.default.object({
      email: _joi.default.string().required().empty().min(6).max(32).messages({
        'any.required': 'Email required',
        'string.empty': 'Email empty',
        'string.min': 'Email min 6',
        'string.max': 'Email min 32'
      }),
      password: _joi.default.string().required().empty().min(6).max(32).messages({
        'any.required': 'Password required',
        'string.empty': 'Password empty',
        'string.min': 'Password min 6',
        'string.max': 'Password min 32'
      })
    }).options({
      stripUnknown: true
    });

    const {
      error,
      value
    } = schema.validate(body);

    if (error) {
      return res.status(400).json((0, _response.errorResponse)(error.message));
    }

    const {
      email
    } = value;

    try {
      const user = await _models.User.findOne({
        email
      });

      if (user) {
        return res.status(400).json((0, _response.errorResponse)('Email exist'));
      }
    } catch (err) {
      return next(err);
    }

    return next();
  }

}

exports.default = UserValidator;