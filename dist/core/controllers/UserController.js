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
    let {
      limit,
      page
    } = query;
    const totalRows = await _models.User.find().countDocuments().exec();
    let users;
    limit = parseInt(limit);
    page = parseInt(page);

    if (limit && query) {
      users = await Post.find().limit(limit).skip(limit * page).exec();
    } else {
      limit = totalRows;
      page = 1;

      try {
        users = await _models.User.find().exec();
      } catch (err) {
        console.log(err);
      }
    }

    return res.status(200).json({
      msg: 'Get users successfully',
      users,
      pagination: {
        limit,
        page,
        totalRows
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
        msg: 'Register account successfully',
        user
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
          msg
        });
      }

      return res.status(200).json({
        msg,
        user: data
      });
    })(req, res, next);
  }

}

var _default = new UserController();

exports.default = _default;