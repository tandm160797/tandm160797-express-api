import { Router } from 'express';
import postController from '../core/controllers/PostController';
import { auth } from './../middlewares';

const router = Router();

router.use(auth);
router.get('/', postController.index);
router.post('/', postController.create);
router.get('/:id', postController.show);
router.put('/:id', postController.update);
router.delete('/:id', postController.destroy);

export default router;
