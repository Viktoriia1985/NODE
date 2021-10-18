const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');
const { userRoles } = require('../configs');
const { userValidators } = require('../validators');

router.get(
    '/',
    userController.getUsers
);
router.post(
    '/',
    userMiddleware.isUserBodyValid(userValidators.createUserValidator),
    userMiddleware.checkUserByEmail,
    userController.createUser
);

router.get(
    '/:user_id',
    userMiddleware.checkUserId,
    userController.getUserById
);
router.put(
    '/:user_id',
    userMiddleware.isUserBodyValid(userValidators.updateUserValidator),
    userMiddleware.checkUserId,
    userController.updateUser
);
router.delete(
    '/:user_id',
    userMiddleware.checkUserId,
    userMiddleware.checkUserRole([
        userRoles.USER,
        userRoles.ADMIN
    ]),
    userController.deleteUser
);

module.exports = router;
