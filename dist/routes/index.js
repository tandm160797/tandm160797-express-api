"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = router;

var _cors = _interopRequireDefault(require("cors"));

var _user = _interopRequireDefault(require("./user"));

var _post = _interopRequireDefault(require("./post"));

var _site = _interopRequireDefault(require("./site"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function router(app) {
  app.use((0, _cors.default)());
  app.use('/user', _user.default);
  app.use('/post', _post.default);
  app.use('/', _site.default);
}