const Joi = require('@hapi/joi');

const userSchema = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email().lowercase().required(),
    phoneNumber: Joi.string(),
    password: Joi.string().required().min(6),
    bookDescription: Joi.string(),
    favoriteQuote: Joi.string()
});

const quoteSchema = Joi.object({
    quote: Joi.string().required(),
    source: Joi.string().required(),
    category: Joi.string().required()
});

module.exports = {
    userSchema,
    quoteSchema
}