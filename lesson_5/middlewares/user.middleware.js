const ErrorHandler = require('../errors/ErrorHandler');
const { userService } = require('../services');
const userValidator = require('../validators/user.validator');
const { messages, statusCodes } = require('../constants');

module.exports = {
    isUserPresent: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            //  const user = await userService.getUserById(user_id).select('_id email');
            //  const user = await userService.getUserById(user_id).select('-email -role');
            //  const user = await userService.getUserById(user_id).select('+password');
            //  const user = await userService.getUserById(user_id).lean();
            const user = await userService.getUserById(user_id);

            if (!user) {
                throw new ErrorHandler(statusCodes.NOT_FOUND, messages.NOT_FOUND);
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    isAdmin: (req, res, next) => {
        try {
            const { user } = req;

            if (user.role !== 'admin') {
                throw new ErrorHandler(statusCodes.FORBIDDEN, messages.FORBIDDEN);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUniqueEmail: async (req, res, next) => {
        try {
            const { email } = req.body;

            const userByEmail = await userService.getOne(email);

            if (userByEmail) {
                throw new ErrorHandler(statusCodes.CONFLICT, messages.CONFLICT(email));
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateUserBody: (req, res, next) => {
        try {
            const { error } = userValidator.createUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
