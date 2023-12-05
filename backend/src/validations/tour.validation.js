const { check } = require('express-validator');
const { handleValidationErrors } = require('./utils');

const id = check('id', 'Id should not be provided (automatically assigned).')
    .not()
    .exists();

const userId = check('userId', 'userId should not be provided (automatically assigned).')
    .not()
    .exists();

const name = check('name', 'Name is required.')
    .notEmpty()
    .isString()
    .withMessage('Name should be a string.')
    .isLength({max: 100})
    .withMessage('Name cannot exceed 100 characters.');

const description = check('description')
    .optional()
    .isString()
    .withMessage('Description should be a string.');

const completedOn = check('completedOn')
    .optional()
    .isDate()
    .withMessage('Completed On should be a date.')

exports.validateTour = [
    id,
    userId,
    name,
    description,
    completedOn,
    handleValidationErrors
];
