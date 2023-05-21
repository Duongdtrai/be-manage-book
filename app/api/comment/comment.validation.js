/**
 * User Validation
 */

const Joi = require('@hapi/joi');
const validateInputCreateComment = Joi.object({
    bookId: Joi.number().required(),
    comment: Joi.string().required(),
    star: Joi.number().valid(1, 2, 3, 4, 5).required(),
});

module.exports = {
    validateInputCreateComment
};

