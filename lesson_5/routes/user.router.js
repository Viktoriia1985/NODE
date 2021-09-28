const router = require('express').Router();

const { userController } = require('../controllers');
const {
    isUserPresent,
    checkUniqueEmail,
    isAdmin,
    validateUserBody
} = require('../middlewares/user.middleware');

router.post('/', validateUserBody, checkUniqueEmail, userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:user_id', isUserPresent, userController.getSingleUser);
router.patch('/:user_id', isUserPresent, checkUniqueEmail, userController.updateUser);
router.delete('/:user_id', isUserPresent, isAdmin, userController.deleteUser);

module.exports = router;
