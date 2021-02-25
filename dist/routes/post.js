"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _PostController = _interopRequireDefault(require("../core/controllers/PostController"));

var _middlewares = require("./../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
router.use(_middlewares.auth);
router.get('/', _PostController.default.index);
router.post('/', _PostController.default.create);
router.get('/:id', _PostController.default.show);
router.put('/:id', _PostController.default.update);
router.delete('/:id', _PostController.default.destroy);
var _default = router;
exports.default = _default;