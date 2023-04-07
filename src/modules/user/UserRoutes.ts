import express from 'express';
import UserController from './UserController';
import AuthController from '../../utils/AuthController';

const router = express.Router();

router.post('/', UserController.signUp);
router.post('/authenticate', UserController.signIn);

router.get('/', UserController.GET);
router.get('/:id', UserController.GET);

router.use(AuthController.protectRoute);

router.delete('/', UserController.DELETE);
router.put('/', UserController.UPDATE);

export default router;