import { Post } from '../models';

class PostController {
  async index(req, res, next) {
    const { query } = req;
    let { limit, page } = query;
    const { title_like } = query;
    const totalRows = await Post.find().countDocuments().exec();
    let posts;

    limit = parseInt(limit);
    page = parseInt(page);

    if (limit && query) {
      if (title_like) {
        const rgx = new RegExp(title_like, 'i');
        posts = await Post.find({ title: { $regex: rgx } })
          .limit(limit)
          .skip(limit * (page - 1))
          .exec();
      } else {
        posts = await Post.find()
          .limit(limit)
          .skip(limit * (page - 1))
          .exec();
      }
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
    const { body } = req;
    const post = new Post(body);
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

export default new PostController();
