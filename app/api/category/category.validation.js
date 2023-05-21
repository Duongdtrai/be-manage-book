/**
 * User Validation
 */

const Joi = require('@hapi/joi');
const validateInputCreateCategory = Joi.object({
    image: Joi.object().allow(null, ""),
    title: Joi.string().required(),
});

module.exports = {
    validateInputCreateCategory
};

