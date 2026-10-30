const { Router } = require('express');
const auth = require('../controllers/auth.controller');
const { requireAuth } = require('../middleware/auth');

const router = Router();

router.post('/login', auth.login);
router.post('/logout', requireAuth, auth.logout);

module.exports = router;
