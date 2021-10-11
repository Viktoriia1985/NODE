const User = require('../dataBase/User');
const passwordService = require('../service/password.servise');
const userUtil = require('../util/user.util');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find();

            res.json(users);
        } catch (e) {
            res.json(e);
        }
    },

    getUserById: async (req, res) => {
        try {
            const { user_id } = req.params;
            const user = await User.findById(user_id).lean();

            const normalizedUser = userUtil.userNormalizator(user);

            res.json(normalizedUser);

        } catch (e) {
            res.json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const hashedPassword = await passwordService.hash(req.body.password);

            const newUser = await User.create({ ...req.body, password: hashedPassword });

            res.json(newUser).status(201);
        } catch (e) {
            res.json(e);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { user_id } = req.params;

            await User.findByIdAndRemove(user_id);

            res.sendStatus(204);
        } catch (e) {
            res.json(e);
        }
    }
};
