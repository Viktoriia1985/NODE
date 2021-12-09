const { AUTHORIZATION } = require('../configs/constants');
const { tokenTypes } = require('../configs');
const { jwtService, passwordService } = require('../service');
const { ErrorHandler } = require('../errors');
const O_Auth = require('../dataBase/O_Auth');
const userValidator = require('../validators/user.validator');
const { authValidators } = require('../validators');

module.exports = {
    isPasswordsMatched: async (req, res, next) => {
        try {
            const { password } = req.body;
            const { password: hashPassword } = req.user;

            console.log('___________________________');
            console.log(password);
            console.log('___________________________');

            await passwordService.compare(password, hashPassword);

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserBodyValidAuth: (req, res, next) => {
        try {
            const { error, value } = authValidators.loginValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler('Wrong mail or password', 400);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler('No token', 401);
            }

            await jwtService.verifyToken(token);

            const tokenResponse = await O_Auth
                .findOne({ access_token: token })
                .populate('user_id');

            if (!tokenResponse) {
                throw new ErrorHandler('Invalid token', 401);
            }

            req.user = tokenResponse.user_id;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler('No token', 401);
            }

            await jwtService.verifyToken(token, tokenTypes.REFRESH);

            const tokenResponse = await O_Auth.findOne({ refresh_token: token });

            console.log('tokenResponsetokenResponsetokenResponsetokenResponse');
            console.log(tokenResponse);
            console.log('tokenResponsetokenResponsetokenResponsetokenResponse');

            if (!tokenResponse) {
                throw new ErrorHandler('Invalid token', 401);
            }

            await O_Auth.remove({ refresh_token: token });

            req.user = tokenResponse.user_id;

            next();
        } catch (e) {
            next(e);
        }
    }
};
