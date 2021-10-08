const User = require('../dataBase/User');

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
        const { user_id } = req.params;
        const user = await User.findById(user_id);

        res.json(user);
    },

    createUser: async (req, res) => {
        try {
            const newUser = await User.create(req.body);

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
