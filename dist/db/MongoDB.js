"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MongoDB {
  async connect() {
    try {
      const dbUser = process.env.DB_USER;
      const dbPassword = process.env.DB_PASSWORD;
      const dbName = process.env.DB_NAME;
      const connectString = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.ewyk4.mongodb.net/${dbName}?retryWrites=true&w=majority`;
      const mongooseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true
      };
      await _mongoose.default.connect(connectString, mongooseOptions);
      console.log('Connect to MongoDB successfully!');
    } catch (err) {
      console.log('Connect to MongoDB failure!!!');
    }
  }

}

var _default = new MongoDB();

exports.default = _default;