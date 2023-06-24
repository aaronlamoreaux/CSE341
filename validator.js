const {
    check
} = require('express-validator');

const signupValidation = [
    check('firstName', 'First name is required').not().isEmpty(),
    check('lastName', 'Last name is required').not().isEmpty(),
    check('phoneNumber', 'Phone number is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail().normalizeEmail({
        gmail_remove_dots: true
    }),
    check('password', 'Password must be 6 or more characters').isLength({
        min: 6
    })
]

const loginValidation = [
    check('email', 'Please include a valid email').isEmail().normalizeEmail({
        gmail_remove_dots: true
    }),
    check('password', 'Password must be 6 or more characters').isLength({
        min: 6
    })

]

const quoteValidation = [
    check('quote', 'quote is required').not().notEmpty(),
    check('source', 'source is required').not().notEmpty(),
    check('category', 'category is required').not().notEmpty(),
]

module.exports = {
    signupValidation,
    loginValidation,
    quoteValidation
}