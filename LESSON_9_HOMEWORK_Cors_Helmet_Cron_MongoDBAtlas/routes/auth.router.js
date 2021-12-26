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
    authMiddleware.isUserPasswordValid, // todo валыдация нового паролю (made at home)
    authMiddleware.checkActionToken, // todo перевырити токен (екшин) (made at home)
    authController.setNewPasswordAfterForgot);

module.exports = router;

