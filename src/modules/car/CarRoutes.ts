import express from 'express';
import CarController from './CarController';
import AuthController from '../../utils/AuthController';

const router = express.Router();

router.use(AuthController.protectRoute);

router.post('/', CarController.POST);

router.get('/', CarController.GET);
router.get('/:id', CarController.GET);

router.delete('/', CarController.DELETE);

router.put('/', CarController.UPDATE);

router.patch('/', CarController.PATCH);

export default router;