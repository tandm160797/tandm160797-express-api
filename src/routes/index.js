import cors from 'cors';
import userRouter from './user';
import postRouter from './post';
import siteRouter from './site';

export default function router(app) {
  app.use(cors());
  app.use('/user', userRouter);
  app.use('/post', postRouter);
  app.use('/', siteRouter);
}
