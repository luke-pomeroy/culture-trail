const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');
const db = require ('./db/models');
const { errorHandler } = require('./middleware/auth/');
const createError = require('./utils/createError');


const routes = require('./routes');

const env = process.env.NODE_ENV || 'development';
const isProduction = env === 'production';

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (!isProduction) {
    // enable cors only in development
    app.use(cors());
}

app.use(helmet({
    contentSecurityPolicy: false
}));

app.use(express.static(path.join(__dirname, '../public')));

app.use(routes);

// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
    let errors = {[_req.originalUrl]: 'Resource not found'}
    next(createError(404, 'The requested resource could not be found', errors))
});
  
app.use(errorHandler);

module.exports = app;
