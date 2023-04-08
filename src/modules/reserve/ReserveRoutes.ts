import express from 'express';
import ReserveController from './ReserveController';
import AuthController from '../../utils/AuthController';

const router = express.Router();

router.use(AuthController.protectRoute);

router.post('/', ReserveController.POST);

router.get('/', ReserveController.GET);
router.get('/:id', ReserveController.GET);

router.delete('/:id', ReserveController.DELETE);

router.put('/:id', ReserveController.UPDATE);

export default router;