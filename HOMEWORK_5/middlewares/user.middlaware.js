const User = require('../dataBase/User');
const { passwordService } = require('../service');
const { errors, ErrorHandler } = require('../errors');

const { EMAIL_REGISTERED, NOT_VALID_BODY, NOT_FOUND_BY_ID, FORBIDDEN_REQUEST } = errors;

module.exports = {
    checkUserByEmail: async (req, res, next) => {
        try {
            const { email } = req.body;

            const userByEmail = await User.findOne({ email });

            if (userByEmail) {
                throw new ErrorHandler(EMAIL_REGISTERED);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserForLogin: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                throw new ErrorHandler(NOT_VALID_BODY);
            }

            await passwordService.compare(password, user.password);

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserId: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            const user = await User.findById(user_id);

            if (!user) {
                throw new ErrorHandler(NOT_FOUND_BY_ID);
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserBodyValid: (validator, isLogin) => (req, res, next) => {
        try {
            const { error, value } = validator.validate(req.body);

            if (error) {
                throw new ErrorHandler({
                    message: isLogin ? NOT_VALID_BODY.message : error.details[0].message,
                    code: NOT_VALID_BODY.code
                });
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserRole: (roleArr = []) => (req, res, next) => {
        try {
            const { role } = req.user;

            if (!roleArr.includes(role)) {
                throw new ErrorHandler(FORBIDDEN_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
