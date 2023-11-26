const { ValidationError } = require('sequelize');

module.exports = (err, req, res, next) => {
// Process validation and sequelize errors
    // check if error is a Sequelize error:
    if (err instanceof ValidationError) {
        err.statusCode = 422;
        const errorMessages = {};
        err.errors.forEach((e) => {
        errorMessages[e.path] = e.message;
        });
        err.errors = errorMessages;
        err.message = 'Database Validation Error';
    }

    res.status(err.statusCode || 500);
    console.log(err);
    res.json({
        status: 'ERROR',
        statusCode: err.statusCode,
        message: err.message,
        errors: err.errors,
        stack: process.env.NODE_ENV === 'production' ? {} : err.stack,
    });
};