import Mongoose from 'mongoose';

class MongoDB {
  async connect() {
    try {
      const dbUser = process.env.DB_USER || 'root';
      const dbPassword = process.env.DB_PASSWORD || 'root';
      const dbName = process.env.DB_NAME || 'express-api';
      const connectString = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.ewyk4.mongodb.net/${dbName}?retryWrites=true&w=majority`;
      const mongooseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true
      };
      await Mongoose.connect(connectString, mongooseOptions);
      console.log('Connect to MongoDB successfully!');
    } catch (err) {
      console.log('Connect to MongoDB failure!!!');
    }
  }
}

export default new MongoDB();
