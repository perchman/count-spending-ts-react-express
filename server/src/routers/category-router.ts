import { Router } from 'express';

const controller = require('../controllers/category-controller');

const router = Router();

router.get('/:uuid',  controller.getCategoryByUuid);
router.get('/:page/:sort/:size', controller.getPartCategories);
router.post('/', controller.createCategory);
router.put('/:uuid', controller.updateCategory);
router.delete('/:uuid', controller.deleteCategory);

export default router;