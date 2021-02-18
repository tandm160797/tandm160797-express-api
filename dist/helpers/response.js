"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorResponse = exports.successResponse = void 0;

const successResponse = (msg, data) => ({
  stt: 'success',
  msg,
  data
});

exports.successResponse = successResponse;

const errorResponse = msg => ({
  stt: 'failure',
  msg,
  data: null
});

exports.errorResponse = errorResponse;