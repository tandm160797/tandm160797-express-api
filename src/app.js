import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { mongoDB } from './db';
import router from './routes';
import { errLastHandler } from './middlewares';

(async () => {
  const app = express();

  app.set('view engine', 'pug');
  app.set('views', path.join(path.resolve(), 'public/views'));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static(path.join(path.resolve(), 'public')));
  router(app);
  await mongoDB.connect();
  app.use(errLastHandler);

  app.listen(process.env.PORT, () => {
    console.log('App start successfully!');
  });
})();
