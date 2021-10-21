const User = require('../dataBase/User');
const { passwordService } = require('../service');
const { userUtil } = require('../util');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await User.find({});

            const normalizedUsers = users.map(value => userUtil.userNormalizator(value));

            res.json(normalizedUsers);
        } catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            const normalizedUser = userUtil.userNormalizator(req.user);

            res.json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const { password } = req.body;

            const hashedPassword = await passwordService.hash(password);

            const newUser = await User.create({ ...req.body, password: hashedPassword });

            const normalizedUser = userUtil.userNormalizator(newUser);

            res.status(201).json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const { name } = req.body;

            const user = await User.findByIdAndUpdate(user_id, { name }, { new: true });

            const normalizedUser = userUtil.userNormalizator(user);

            res.status(201).json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            await User.deleteOne({ _id: user_id });

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }
};
