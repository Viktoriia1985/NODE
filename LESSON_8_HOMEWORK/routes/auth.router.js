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
    //todo check authoriz
    authController.logout);

router.post('/refresh',
    authMiddleware.checkRefreshToken,
    authController.refreshToken);

router.post('/password/forgot',
    // todo валыдацыя емейлу (joi)
    // todo перевырити чи е такий мейлик
    authController.sendMailForgotPassword);

router.put('/password/forgot',
    // todo валыдаыя нового паролю
    // todo перевырити токен (екшин)
    authController.setNewPasswordAfterForgot);

module.exports = router;

