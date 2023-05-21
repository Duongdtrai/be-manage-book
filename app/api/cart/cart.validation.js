/**
 * User Validation
 */

const Joi = require('@hapi/joi');
const validateInputCreateCart = Joi.object({
    bookId: Joi.number().required(),
    status: Joi.string().valid('in-cart', 'order-success', 'delivery', 'success').required(),
    note: Joi.string().allow(null, ""),
    address: Joi.string().allow(null, ""),
    numberPhone: Joi.string().allow(null, "").length(10),
    quantity: Joi.number().allow(null, ""),
    fullName: Joi.string().allow(null, "")
});

const validateStatus = Joi.string().valid('in-cart', 'order-success', 'delivery', 'success').required();
module.exports = {
    validateInputCreateCart,
    validateStatus
};

