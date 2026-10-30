const { Router } = require('express');
const order = require('../controllers/order.controller');
const { requireAuth } = require('../middleware/auth');

const router = Router();

router.get('/orders', requireAuth, order.list);
router.post('/orders', requireAuth, order.create);

module.exports = router;
