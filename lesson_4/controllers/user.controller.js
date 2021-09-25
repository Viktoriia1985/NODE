//  цьому файлі створюється бізнес логіка

const { userService } = require('../services');

module.exports = {
    getSingleUser: (req, res, next) => {
        try {
            const { user } = req;

            res.json(user);
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
            const createdUser = await userService.createUser(req.body);

            res.status(201).json(createdUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            await userService.deleteUser(user_id);

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            await userService.updateUser(user_id, req.body);

            res.status(201).json(`user with id ${user_id} is updated successfully`);
        } catch (e) {
            next(e);
        }
    }
};
