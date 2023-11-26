const { check } = require('express-validator');
const{ handleValidationErrors } = require('./utils');

const email = check('email', 'A valid email address is required.')
    .notEmpty()
    .isEmail();

const password = check('password', 'A Password with a minimum length of 8 characters is required.')
    .notEmpty()
    .isLength({ min: 8 });

exports.validateCredentials = [
    email,
    password,
    handleValidationErrors
];