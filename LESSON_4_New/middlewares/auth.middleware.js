const User = require('../dataBase/User');

module.exports = {
    checkLoginMiddleware: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const userByLogin = await User.findOne({ email });

            if (!userByLogin) {
                throw new Error('Email and password not exists');
            }

            if (userByLogin.password !== password) {
                throw new Error('Email and password not exists');
            }

            req.user = userByLogin;
            next();
        } catch (e) {
            res.json(e.message);
        }
    },
};
