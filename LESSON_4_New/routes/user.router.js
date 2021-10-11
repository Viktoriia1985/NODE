const router = require('express').Router();

const userController = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middlaware');

router.get('/', userController.getUsers);
router.post(
    '/',
    userMiddleware.isUserBodyValid,
    userMiddleware.createUserMiddleware,
    userController.createUser);

router.get('/:user_id', userController.getUserById);
router.delete('/:user_id', userController.deleteUser);

module.exports = router;
