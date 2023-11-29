import { Router } from 'express';

const controller = require('../controllers/category-controller');

const router = Router();

router.get('/uuid=:uuid',  controller.getCategoryByUuid);
router.get('/page=:page/sort=:sort/page_size=:size', controller.getPartCategories);
router.get('/sort=:sort', controller.getAllSortedCategories);
router.post('/', controller.createCategory);
router.put('/uuid=:uuid', controller.updateCategory);
router.delete('/uuid=:uuid', controller.deleteCategory);

export default router;