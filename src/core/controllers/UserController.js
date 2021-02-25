import { User } from './../models';
import { passport } from './../../helpers';

class UserController {
  async index(req, res, next) {
    const { query } = req;
    let { limit, page } = query;
    const totalRows = await User.find().countDocuments().exec();
    let users;

    limit = parseInt(limit);
    page = parseInt(page);

    if (limit && query) {
      users = await Post.find()
        .limit(limit)
        .skip(limit * page)
        .exec();
    } else {
      limit = totalRows;
      page = 1;
      try {
        users = await User.find().exec();
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
    const { body } = req;
    const user = new User(body);
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
    passport.authenticate('local', { session: false }, (err, data, msg) => {
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

export default new UserController();
