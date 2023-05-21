/**
 * User Validation
 */

const Joi = require('@hapi/joi');
const validateInputCreateBook = Joi.object({
    image: Joi.object().allow(null, ""),
    title: Joi.string().required(),
    description: Joi.string().allow(null, ""),
    price: Joi.number().required(),
    author: Joi.number().required(),
    numberPage: Joi.number().required(),
    category: Joi.number().required(),
    releaseDate: Joi.string().required(),
});

module.exports = {
    validateInputCreateBook
};
