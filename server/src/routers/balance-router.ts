import { Router } from 'express';

const controller = require('../controllers/balance-controller');

const router = Router();

router.get('/', controller.getBalance);
router.post('/', controller.replenish);
router.get('/history/page=:page/sort=:sort/page_size=:size', controller.getHistory);

export default router;