/**
 * User Validation
 */

const Joi = require('@hapi/joi');
const validateInputCreateAuthor = Joi.object({
    image: Joi.object().allow(null, ""),
    fullName: Joi.string().required(),
    description: Joi.string().allow(null, ""),
    birthday: Joi.string().allow(null, ""),
    address: Joi.string().allow(null, ""),
    gender: Joi.string().allow(null, ""),
});

module.exports = {
    validateInputCreateAuthor
};
