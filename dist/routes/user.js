"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _UserController = _interopRequireDefault(require("./../core/controllers/UserController"));

var _middlewares = require("./../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
router.post('/login', _UserController.default.login);
router.post('/register', _middlewares.UserValidator.register, _UserController.default.register);
router.use(_middlewares.auth);
router.get('/', _UserController.default.index);
router.post('/', _UserController.default.create);
router.get('/:id', _UserController.default.show);
router.put('/:id', _UserController.default.update);
router.delete('/:id', _UserController.default.destroy);
var _default = router;
exports.default = _default;