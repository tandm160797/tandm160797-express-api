import { User } from "$models";
import { passport } from "$helpers";

class UserController {
  async index(req, res, next) {
    const users = await User.find().exec();
    return res.status(200).json({
      stt: "success",
      msg: "Get users successfully",
      data: users,
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
        stt: "success",
        msg: "Register account successfully",
        data: user,
      });
    } catch (err) {
      return next(err);
    }
  }

  login(req, res, next) {
    passport.authenticate("local", { session: false }, (err, data, msg) => {
      if (err) {
        return next(err);
      }
      if (!data) {
        return res.status(401).json({
          stt: "failure",
          msg,
          data: null,
        });
      }
      return res.status(200).json({
        stt: "success",
        msg,
        data,
      });
    })(req, res, next);
  }
}

export default new UserController();
