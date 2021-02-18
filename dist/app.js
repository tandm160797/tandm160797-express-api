"use strict";

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _db = require("./db");

var _routes = _interopRequireDefault(require("./routes"));

var _middlewares = require("./middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(async () => {
  const app = (0, _express.default)();
  const host = process.env.HOST || '127.0.0.1';
  const port = process.env.PORT || 3000;
  app.set('view engine', 'pug');
  app.set('views', _path.default.join(_path.default.resolve(), 'public/views'));
  app.use(_bodyParser.default.json());
  app.use(_bodyParser.default.urlencoded({
    extended: true
  }));
  app.use(_express.default.static(_path.default.join(_path.default.resolve(), 'public')));
  (0, _routes.default)(app);
  await _db.mongoDB.connect();
  app.use(_middlewares.errLastHandler);
  app.listen(port, () => {
    console.log(`App listening at ${host}:${port}`);
  });
})();