const User = require('../dataBase/User');
const authValidator = require('../validators/auth.validator');
const passwordService = require('../service/password.servise');

module.exports = {
    isALoginValid: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const {error} = await authValidator.validate({email, password});

            if (error) {
                throw new Error('Wrong email or password');
            }

            const user = await User.findOne({email});

            if (!user) {
                throw new Error('Wrong email or password');
            }

            req.hashPassword = user.password;
            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    authorizationMiddleware: async (req, res, next) => {
        try {
            const hashPassword = req.hashPassword;
            const {password} = req.body;

            await passwordService.compare(password, hashPassword);

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
