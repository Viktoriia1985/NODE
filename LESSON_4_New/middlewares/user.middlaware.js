const User = require('../dataBase/User');
const userValidator = require('../validators/user.validator');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const { email } = req.body;

            const userByEmail = await User.findOne({ email });

            if (userByEmail) {
                throw new Error('Email already exist');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    isUserBodyValid: (req, res, next) => {
        try {

            const { error, value } = userValidator.createUserValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.bode = value;
            
            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
