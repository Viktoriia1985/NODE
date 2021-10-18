const router = require('express').Router();

const { authController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

router.post(
    '/login',
    userMiddleware.isUserBodyValid,
    userMiddleware.checkUserForLogin,
    authController.getUserLogin
);

module.exports = router;
