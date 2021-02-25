"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../models");

class PostController {
  async index(req, res, next) {
    const {
      query
    } = req;
    let {
      limit,
      page
    } = query;
    const totalRows = await _models.Post.find().countDocuments().exec();
    let posts;
    limit = parseInt(limit);
    page = parseInt(page);

    if (limit && query) {
      posts = await _models.Post.find().limit(limit).skip(limit * page).exec();
    } else {
      limit = totalRows;
      page = 1;

      try {
        posts = await _models.Post.find().exec();
      } catch (err) {
        console.log(err);
      }
    }

    return res.status(200).json({
      stt: 'success',
      code: 200,
      msg: 'Get posts successfully',
      posts,
      pagination: {
        limit,
        page,
        totalRows
      }
    });
  }

  async create(req, res, next) {
    const {
      body
    } = req;
    const post = new _models.Post(body);

    try {
      await post.save();
      return res.status(200).json({
        stt: 'success',
        code: 200,
        msg: 'Create post successfully',
        post
      });
    } catch (err) {
      return next(err);
    }
  }

  async show(req, res, next) {}

  async update(req, res, next) {}

  async destroy(req, res, next) {}

}

var _default = new PostController();

exports.default = _default;