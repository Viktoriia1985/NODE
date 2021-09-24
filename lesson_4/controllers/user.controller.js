//  цьому файлі створюється бізнес логіка

const User = require('../dataBase/User');

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
            const users = await User.find({});

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const createdUser = await User.create(req.body);

            res.status(201).json(createdUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            await User.deleteOne({ _id: user_id });

            res.status(204).json(`User with id ${user_id} is deleted`);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            await User.updateOne({ _id: user_id }, req.body);

            res.status(201).json(`user with id ${user_id} is updated successfully`);
        } catch (e) {
            next(e);
        }
    }
};
