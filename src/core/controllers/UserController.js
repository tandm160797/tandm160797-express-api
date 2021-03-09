import jwt from 'jsonwebtoken';
import { passport } from './../../helpers';
import { User } from './../models';

class UserController {
	async index(req, res, next) {
		const { query } = req;
		let { limit, page } = query;
		let { username_like } = query;
		const totalRows = await User.find().countDocuments().exec();
		let users;

		limit = parseInt(limit);
		page = parseInt(page);

		if (limit && query) {
			if (title_like) {
				const rgx = new RegExp(username_like, 'i');
				users = await User.find({ username: { $regex: rgx } })
					.limit(limit)
					.skip(limit * (page - 1))
					.exec();
			} else {
				users = await User.find()
					.limit(limit)
					.skip(limit * (page - 1))
					.exec();
			}
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
			stt: 'success',
			code: 200,
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
			const jwtSecretKey = process.env.JWT_SECRET_KEY;
			const jwtExp = process.env.JWT_EXP || 24 * 60 * 60;
			const jwtToken = jwt.sign({ id: user._id }, jwtSecretKey, {
				expiresIn: jwtExp
			});
			return res.status(200).json({
				stt: 'success',
				code: 200,
				msg: 'Register account successfully',
				user,
				jwtToken
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
				return res.status(200).json({
					stt: 'failure',
					code: 401,
					msg
				});
			}

			const { user, jwtToken } = data;
			return res.status(200).json({
				stt: 'success',
				code: 200,
				msg,
				user,
				jwtToken
			});
		})(req, res, next);
	}
}

export default new UserController();
