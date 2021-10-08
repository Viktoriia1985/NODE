const router = require('express').Router();

const loginController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/login', authMiddleware.checkLoginMiddleware, loginController.getLogin);

module.exports = router;
