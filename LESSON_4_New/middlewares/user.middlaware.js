const User = require('../dataBase/User');
const userValidator = require('../validators/user.validator');
const userUtil = require('../util/user.util');

module.exports = {
    getUserByIdMiddleware: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            let user = await User.findById(user_id).lean();

            if (!user) {
                throw new Error('User is not exist');
            }

            user = userUtil.userNormalizator(user);

            req.user = user;
            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    createUserValidBody: async (req, res, next) => {
        try {
            const { error, value } = await userValidator.createUserValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    createUserMiddleware: async (req, res, next) => {
        try {
            const { email } = req.body;
            const userByEmail = await User.findOne({ email });

            if (userByEmail) {
                throw new Error('Email already exists');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    updateUserMiddleware: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const user = userUtil.userNormalizator(req.body);

            const updateUser = await User.updateOne({ _id: user_id }, { $set: { ...user } });

            if (!updateUser) {
                throw new Error('User is not Update');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    updateUserValidBody: async (req, res, next) => {
        try {
            const { name } = req.body;
            const { error, value } = await userValidator.updateUserValidator.validate({ name });

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body = value;
            next();
        } catch (e) {
            res.json(e.message);
        }
    },

};
