import { Router } from 'express';
import userController from './../core/controllers/UserController';
import { auth, UserValidator } from './../middlewares';

const router = Router();

router.post('/login', userController.login);
router.post('/register', UserValidator.register, userController.register);

router.use(auth);
router.get('/', userController.index);
router.post('/', userController.create);
router.get('/:id', userController.show);
router.put('/:id', userController.update);
router.delete('/:id', userController.destroy);

export default router;
