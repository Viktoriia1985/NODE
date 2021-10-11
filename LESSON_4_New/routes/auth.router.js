const router = require('express').Router();

const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post(
    '/',
    authMiddleware.isALoginValid,
    authMiddleware.authorizationMiddleware,
    authController.authorizationUser);

module.exports = router;
