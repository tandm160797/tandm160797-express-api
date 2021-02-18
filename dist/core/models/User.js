"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _mongooseDelete = _interopRequireDefault(require("mongoose-delete"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userSchema = new _mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String
}, {
  timestamps: true
});
userSchema.plugin(_mongooseDelete.default, {
  overrideMethods: 'all',
  deletedAt: true
});

userSchema.methods.fullName = function () {
  return `${this.firstName} ${this.lastName}`;
};

userSchema.methods.verifyPassword = async function (password) {
  return await _bcryptjs.default.compare(password, this.password);
};

userSchema.pre('save', async function () {
  this.password = await _bcryptjs.default.hash(this.password, 10);
});

var _default = _mongoose.default.model('User', userSchema);

exports.default = _default;