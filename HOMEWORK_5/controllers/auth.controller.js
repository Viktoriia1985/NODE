const { userUtil } = require('../util');

module.exports = {
    getUserLogin: (req, res, next) => {
        try {
            const normalizedUser = userUtil.userNormalizator(req.user);

            res.json(normalizedUser);
        } catch (e) {
            next(e);
        }
    }
};
