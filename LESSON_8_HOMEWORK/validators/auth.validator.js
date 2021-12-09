const Joi = require('joi');

const { EMAIL_REGEXP, PASSWORD_REGEXP } = require('../configs/constants');

const loginValidator = Joi.object({
    email: Joi
        .string()
        .regex(EMAIL_REGEXP)
        .trim()
        .required(),
    password: Joi
        .string()
        .regex(PASSWORD_REGEXP)
        .required(),
});

const forgotPassValidator = Joi.object({
    password: Joi
        .string()
        .regex(PASSWORD_REGEXP)
        .required(),
});

module.exports = {
    loginValidator,
    forgotPassValidator
};
