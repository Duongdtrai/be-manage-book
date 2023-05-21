/**
 * User Validation
 */

const Joi = require('@hapi/joi');
const validateInputCreateCart = Joi.object({
    bookId: Joi.number().required(),
    status: Joi.string().valid('in-cart', 'order-success', 'delivery', 'success').required(),
    note: Joi.string().allow(null, ""),
    address: Joi.string().required(),
    numberPhone: Joi.string().required().length(10),
    quantity: Joi.number().required(),
});

module.exports = {
    validateInputCreateCart
};

