import express from 'express';
import CarController from './CarController';
import AuthController from '../../utils/AuthController';

const router = express.Router();

router.use(AuthController.protectRoute);

router.post('/', CarController.POST);

router.get('/', CarController.GET);
router.get('/:id', CarController.GET);

router.delete('/:id', CarController.DELETE);

router.put('/:id', CarController.UPDATE);

router.patch('/:id/accessories/:id', CarController.PATCH);

export default router;