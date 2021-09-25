const User = require('../dataBase/User');
const ErrorHandler = require('../errors/ErrorHandler');
const { userService } = require('../services');

module.exports = {
    isUserPresent: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            const user = await userService.getUserById(user_id);

            if (!user) {
                throw new ErrorHandler(418, 'user not found');
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

            // console.log(user)

            if (user.role !== 'admin') {
                throw new ErrorHandler(403, 'forbidden delete');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUniqueEmail: async (req, res, next) => {
        try {
            const { email } = req.body;

            const userByEmail = await User.findOne({ email });

            if (userByEmail) {
                throw new ErrorHandler(409, `Email ${email} is already exist`);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
