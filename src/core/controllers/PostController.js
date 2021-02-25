import { Post } from '../models';

class PostController {
  async index(req, res, next) {
    const { query } = req;
    let { limit, page } = query;
    const totalRows = await Post.find().countDocuments().exec();
    let posts;

    limit = parseInt(limit);
    page = parseInt(page);

    if (limit && query) {
      posts = await Post.find()
        .limit(limit)
        .skip(limit * page)
        .exec();
    } else {
      limit = totalRows;
      page = 1;
      try {
        posts = await Post.find().exec();
      } catch (err) {
        console.log(err);
      }
    }

    return res.status(200).json({
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
    const { body } = req;
    const post = new Post(body);
    try {
      await post.save();
      return res.status(200).json({
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

export default new PostController();
