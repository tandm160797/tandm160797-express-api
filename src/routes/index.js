import cors from 'cors';
import userRouter from './user';
import siteRouter from './site';

export default function router(app) {
  app.use(cors());
  app.use('/user', userRouter);
  app.use('/', siteRouter);
}
