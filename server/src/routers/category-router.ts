import { Router } from 'express';

const controller = require('../controllers/category-controller');

const router = Router();

router.get('/:id',  controller.getCategoryByUuid);
router.get('/', controller.getPartCategories);
router.post('/', controller.createCategory);
router.put('/:id', controller.updateCategory);
router.delete('/:id', controller.deleteCategory);

export default router;