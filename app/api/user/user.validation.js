/**
 * User Validation
 */

const Joi = require('@hapi/joi');
const validateInputCreateUser = Joi.object({
    image: Joi.object().allow(null, ""),
    email: Joi.string().pattern(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/
    ).required(),
    userName: Joi.string().required(),
    password: Joi.string().required(),
    gender: Joi.string().allow(null, ''),
    age: Joi.number().allow(null, ''),
    address: Joi.string().allow(null, ''),
    numberPhone: Joi.string().allow(null, '').length(10),
});

const validateInputLoginUser = Joi.object({
    email: Joi.string().pattern(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/
    ).required(),
    password: Joi.string().required(),
});

const validateInputEditUser =  Joi.object({
    image: Joi.object().allow(null, ""),
    userName: Joi.string().required(),
    gender: Joi.string().allow(null, ''),
    age: Joi.number().allow(null, ''),
    address: Joi.string().allow(null, ''),
    numberPhone: Joi.string().allow(null, '').length(10),
});

module.exports = {
    validateInputCreateUser,
    validateInputLoginUser,
    validateInputEditUser
};
