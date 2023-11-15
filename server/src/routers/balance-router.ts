import { Router } from 'express';

const controller = require('../controllers/balance-controller');

const router = Router();

router.get('/', controller.getBalance);
router.put('/', controller.replenish);
router.get('/history/:page/:sort/:size');

export default router;