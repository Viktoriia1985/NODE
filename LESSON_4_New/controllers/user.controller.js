const User = require('../dataBase/User');
const passwordService = require('../service/password.servise');
const userUtil = require('../util/user.util');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find().lean();

            users.map(user => userUtil.userNormalizator(user));

            res.json(users);
        } catch (e) {
            res.json(e.message);
        }

    },

    getUserById: (req, res) => {
        try {
            const {user} = req;

            res.json(user);
        } catch (e) {
            res.json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const hashedPassword = await passwordService.hash(req.body.password);

            const newUser = await User.create({...req.body, password: hashedPassword});

            newUser.password = undefined;

            res.json(newUser);
        } catch (e) {
            res.json(e.message);
        }
    },

    updateUserById:  (req, res) => {
        try {
            res.json('User is updated');
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteUserById: async (req, res) => {
        try {
            const {user_id} = req.params;

            const user = await User.deleteOne({_id: user_id});

            res.json(user);
        } catch (e) {
            res.json(e.message);
        }
    },
};
