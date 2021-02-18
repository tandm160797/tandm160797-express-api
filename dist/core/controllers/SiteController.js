"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class SiteController {
  async home(req, res, next) {
    return res.render('index.pug');
  }

}

var _default = new SiteController();

exports.default = _default;