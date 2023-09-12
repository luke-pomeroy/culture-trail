module.exports = (statusCode, message, errors) => {
    const err = new Error(message);
    err.message = message;
    err.errors = errors || { message };
    err.statusCode = statusCode;
    return err;
};
