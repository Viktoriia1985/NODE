const jwt = require('jsonwebtoken');

const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, JWT_ACTION_SECRET } = require('../configs/config');
const tokenTypeEnum = require('../configs/token-types.enum');
const { ErrorHandler } = require('../errors');

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
            let secret = '';
            switch (tokenType) {
                case tokenTypeEnum.ACCESS:
                    secret = JWT_ACCESS_SECRET;
                    break;
                case tokenTypeEnum.REFRESH:
                    secret = JWT_REFRESH_SECRET;
                    break;
                case tokenTypeEnum.ACTION:
                    secret = JWT_ACTION_SECRET;
                    break;

            }

            await jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler('Invalid token', 401);
        }
    },
    createActionToken: () => jwt.sign({}, JWT_ACTION_SECRET, { expiresIn: '1d' })
};
