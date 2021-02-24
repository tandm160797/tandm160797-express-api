"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("./../models");

var _helpers = require("./../../helpers");

class UserController {
  async index(req, res, next) {
    const {
      query
    } = req;
    const {
      limit,
      page
    } = query;
    const totalRows = await _models.User.find().countDocuments().exec();
    let users;

    if (limit && query) {
      users = await Post.find().limit(limit).skip(limit * page).exec();
    } else {
      try {
        users = await _models.User.find().exec();
      } catch (err) {
        console.log(err);
      }
    }

    return res.status(200).json({
      stt: 'success',
      msg: 'Get users successfully',
      data: {
        users,
        pagination: {
          page,
          limit,
          totalRows
        }
      }
    });
  }

  async create(req, res, next) {}

  async show(req, res, next) {}

  async update(req, res, next) {}

  async destroy(req, res, next) {}

  async register(req, res, next) {
    const {
      body
    } = req;
    const user = new _models.User(body);

    try {
      await user.save();
      return res.status(200).json({
        stt: 'success',
        msg: 'Register account successfully',
        data: user
      });
    } catch (err) {
      return next(err);
    }
  }

  login(req, res, next) {
    _helpers.passport.authenticate('local', {
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

      return res.status(200).json({
        stt: 'success',
        msg,
        data
      });
    })(req, res, next);
  }

}

var _default = new UserController();

exports.default = _default;