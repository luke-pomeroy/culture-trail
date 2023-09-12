const { check } = require('express-validator');
const { handleValidationErrors } = require('./utils');

const id = check('id', 'Id cannot be edited!')
    .not()
    .exists();

const name = check('name', 'Name is required')
    .notEmpty()
    .isString()
    .withMessage('Name should be a string')
    .isLength({max: 100})
    .withMessage('Name cannot exceed 100 characters');

const status = check('status')
    .optional()
    .isString()
    .withMessage('Status should be a string')
    .isLength({max: 20})
    .withMessage('Status cannot exeed 20 characters');

const description = check('description')
    .optional()
    .isString()
    .withMessage('Description should be a string');

exports.validateCategory = [
    id,
    name,
    status,
    description,
    handleValidationErrors
];
