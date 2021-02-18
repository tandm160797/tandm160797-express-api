"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errLastHandler = void 0;

const errLastHandler = (err, req, res, next) => {
  if (err) {
    let stackErr = err.stack.split('\n');
    stackErr.shift();
    stackErr = stackErr.map(at => at.replace('    at', 'at'));
    res.status(500).json({
      stt: 'error',
      msg: err.message,
      data: stackErr
    });
  }
};

exports.errLastHandler = errLastHandler;