module.exports = {
    EMAIL_REGISTERED: {
        message: 'Email already exists',
        code: 409
    },

    NOT_VALID_BODY: {
        message: 'Wrong email or password',
        code: 400
    },

    FORBIDDEN_REQUEST: {
        message: 'Access denied',
        code: 403
    },

    NOT_FOUND_BY_ID: {
        message: 'User with this id does not exist',
        code: 404
    }
};
