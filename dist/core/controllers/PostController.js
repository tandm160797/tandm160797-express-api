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
      try {
        posts = await _models.Post.find().exec();
      } catch (err) {
        console.log(err);
      }
    }

    return res.status(200).json({
      stt: 'success',
      msg: 'Get posts successfully',
      data: {
        posts,
        pagination: {
          page,
          limit,
          totalRows
        }
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
        msg: 'Create post successfully',
        data: post
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