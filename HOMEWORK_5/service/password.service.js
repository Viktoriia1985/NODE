const bcrypt = require('bcrypt');

const {ErrorHandler, errors} = require('../errors');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),

    compare: async (password, hashPassword) => {
        const isPasswordMatched = await bcrypt.compare(password, hashPassword);

        if (!isPasswordMatched) {
            throw new ErrorHandler(errors.NOT_FOUND.message, errors.NOT_FOUND.code);
        }
    }
};
