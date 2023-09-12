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

const externalLink = check('externalLink')
    .optional()
    .isURL()
    .withMessage('External Link should be a URL');

const latitude = check('latitude')
    .optional()
    .isNumeric()
    .withMessage('Latitude must be a number')
    .matches(/^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/)
    .withMessage('Latitude must be a valid latitude')
    .custom((value, { req }) => {
        return !value || value && req.body.longitude;
    })
    .withMessage('Longitude needed if latitude value included');

const longitude = check('longitude')
    .optional()
    .not()
    .isString()
    .withMessage('Longitude must be a number')
    .matches(/^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/)
    .withMessage('Longitude must be valid longitude')
    .custom((value, { req }) => {
        return !value || value && req.body.latitude;
    })
    .withMessage('Latitude needed if longitude value included');

    

exports.validatePlace = [
    id,
    name,
    status,
    description,
    externalLink,
    latitude,
    longitude,
    handleValidationErrors
];
