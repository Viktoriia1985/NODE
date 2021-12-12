const router = require('express').Router();

const authController = require('../controllers/auth.controller');
const { authMiddleware, userMiddleware } = require('../middlewares');
const { ADMIN, USER } = require('../configs/user-roles.enum');

router.post(
    '/',
    authMiddleware.isUserBodyValidAuth, // перевірка на авторизацію юзера, чи його email and password валідні
    userMiddleware.isUserPresent, // перевіряємо чи в базі є такий юзер
    userMiddleware.checkUserRole([
        ADMIN,
        USER
    ]),
    authController.login
);

router.post('/logout',
    authMiddleware.checkAccessToken,
    authController.logout);

router.post('/refresh',
    authMiddleware.checkRefreshToken,
    authController.refreshToken);

router.post('/password/forgot',
    authMiddleware.isUserEmailValid,
    userMiddleware.isEmailPresent,
    authController.sendMailForgotPassword
);

router.put('/password/forgot',
    // todo валыдация нового паролю
    // todo перевырити токен (екшин)
    authController.setNewPasswordAfterForgot);

module.exports = router;

