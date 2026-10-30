const { Router } = require('express');
const product = require('../controllers/product.controller');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = Router();

router.get('/products', product.list);
router.post('/products', requireAuth, requireAdmin, product.create);
router.put('/products/:id', requireAuth, requireAdmin, product.update);
router.delete('/products/:id', requireAuth, requireAdmin, product.remove);

module.exports = router;
