import { Router } from 'express';

const controller = require('../controllers/cost-controller');

const router = Router();

router.get('/:uuid', controller.getCostByUuid);
router.get('/:page/:sort/:size', controller.getPartCosts);
router.post('/', controller.createCost);
router.put('/:uuid', controller.updateCost);
router.delete('/:uuid', controller.deleteCost);

export default router;

