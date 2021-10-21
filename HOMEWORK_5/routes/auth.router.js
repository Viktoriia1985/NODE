const { userValidators } = require('../validators');
const router = require('express').Router();

const { authController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

router.post(
    '/login',
    userMiddleware.isUserBodyValid(userValidators.loginUserValidator, true),
    userMiddleware.checkUserForLogin,
    authController.getUserLogin
);

module.exports = router;
