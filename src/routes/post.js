import { Router } from 'express';
import postController from '../core/controllers/PostController';

const router = Router();

router.get('/', postController.index);
router.post('/', postController.create);
router.get('/:id', postController.show);
router.put('/:id', postController.update);
router.delete('/:id', postController.destroy);

export default router;
