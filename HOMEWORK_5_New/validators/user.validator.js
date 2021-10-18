const Joi = require('joi');

const {constants, userRoles} = require('../configs');

const createUserValidator = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
    email: Joi
        .string()
        .trim()
        .required()
        .regex(constants.EMAIL_REGEXP),
    role: Joi
        .string()
        .allow(...Object.values(userRoles)),
    password: Joi
        .string()
        .required()
        .regex(constants.PASSWORD_REGEXP),
});

const loginUserValidator = Joi.object({
    email: Joi
        .string()
        .trim()
        .required()
        .regex(constants.EMAIL_REGEXP),
    password: Joi
        .string()
        .required()
        .regex(constants.PASSWORD_REGEXP),
});

const updateUserValidator = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
});

module.exports = {
    createUserValidator,
    loginUserValidator,
    updateUserValidator
};
