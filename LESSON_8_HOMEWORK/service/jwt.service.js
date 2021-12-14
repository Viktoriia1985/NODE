const jwt = require('jsonwebtoken');

const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = require('../configs/config');
const tokenTypeEnum = require('../configs/token-types.enum');
const { ErrorHandler } = require('../errors');
const { FORGOT_PASSWORD, ACTIVATE_ACCOUNT } = require('../configs/action-token-type.enum');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, JWT_ACCESS_SECRET, { expiresIn: '15m' });
        const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, { expiresIn: '30d' });

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: async (token, tokenType = tokenTypeEnum.ACCESS) => {
        try {
            const secret = tokenType === tokenTypeEnum.ACCESS ? JWT_ACCESS_SECRET : JWT_REFRESH_SECRET;

            await jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler('Invalid token', 401);
        }
    },

    generateActionToken: (actionTokenType) => {
        let secretWord;

        switch (actionTokenType) {
            case ACTIVATE_ACCOUNT:
                secretWord = process.env.JWT_ACTION_SECRET_ACTIVATE_ACCOUNT;
                break;
            case FORGOT_PASSWORD:
                secretWord = process.env.JWT_ACTION_SECRET_FORGOT_PASSWORD;
                break;
            default:
                throw new ErrorHandler('wrong token type', 500);
        }

        return jwt.sign({}, secretWord, { expiresIn: '24h' });
    },

    verifyActionToken: async (token, tokenType) => {
        try {
            let secret;

            switch (tokenType) {
                case ACTIVATE_ACCOUNT:
                    secret = process.env.JWT_ACTION_SECRET_ACTIVATE_ACCOUNT;
                    break;
                case FORGOT_PASSWORD:
                    secret = process.env.JWT_ACTION_SECRET_FORGOT_PASSWORD;
                    break;
                default:
                    throw new ErrorHandler('wrong token type', 500);
            }

            await jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler('Invalid token', 401);
        }
    },
};
