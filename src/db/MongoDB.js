import Mongoose from 'mongoose';

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
      await Mongoose.connect(connectString, mongooseOptions);
      console.log('Connect to MongoDB successfully!');
    } catch (err) {
      console.log('Connect to MongoDB failure!!!');
    }
  }
}

export default new MongoDB();
