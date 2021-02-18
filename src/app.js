import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { mongoDB } from './db';
import router from './routes';
import { errLastHandler } from './middlewares';

(async () => {
  const app = express();
  const host = process.env.HOST || '127.0.0.1';
  const port = process.env.PORT || 3000;

  app.set('view engine', 'pug');
  app.set('views', path.join(path.resolve(), 'public/views'));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static(path.join(path.resolve(), 'public')));
  router(app);
  await mongoDB.connect();
  app.use(errLastHandler);

  app.listen(port, () => {
    console.log(`App listening at http://${host}:${port}`);
  });
})();
