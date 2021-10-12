const router = require('express').Router();

const userController = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middlaware');

router.get(
    '/',
    userController.getUsers);

router.post(
    '/',
    userMiddleware.createUserValidBody,
    userMiddleware.createUserMiddleware,
    userController.createUser);

router.get(
    '/:user_id',
    userMiddleware.getUserByIdMiddleware,
    userController.getUserById);

router.put(
    '/:user_id',
    userMiddleware.getUserByIdMiddleware,
    userMiddleware.updateUserValidBody,
    userMiddleware.updateUserMiddleware,
    userController.updateUserById);

router.delete(
    '/:user_id',
    userMiddleware.getUserByIdMiddleware,
    userController.deleteUserById);

module.exports = router;
