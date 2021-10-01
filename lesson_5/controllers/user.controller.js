//  цьому файлі створюється бізнес логіка

const { userService } = require('../services');
const { statusCodes, messages } = require('../constants');
const passwordService = require('../services/password.service');
const { userNormalizator } = require('../utils/user.util');

module.exports = {
    getSingleUser: (req, res, next) => {
        try {
            const userToReturn = userNormalizator(req.user);

            res.json(userToReturn);
        } catch (e) {
            next(e);
        }
    },

    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.getAllUsers();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const { password } = req.body;

            const hashedPassword = await passwordService.hash(password);
            const createdUser = await userService.createUser({ ...req.body, password: hashedPassword });

            const userToReturn = userNormalizator(createdUser);

            res.status(statusCodes.CREATED).json(createdUser);

            res.json(userToReturn);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            await userService.deleteUser(user_id);

            res.sendStatus(statusCodes.DELETED);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            await userService.updateUser(user_id, req.body);

            res.status(statusCodes.CREATED).json(messages.UPDATED(user_id));
        } catch (e) {
            next(e);
        }
    }
};
