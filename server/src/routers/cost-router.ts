import { Router } from 'express';

const controller = require('../controllers/cost-controller');

const router = Router();

router.get('/uuid=:uuid', controller.getCostByUuid);
router.get('/page=:page/sort=:sort/page_size=:size', controller.getPartCosts);
router.post('/', controller.createCost);
router.put('/uuid=:uuid', controller.updateCost);
router.delete('/uuid=:uuid', controller.deleteCost);

export default router;

