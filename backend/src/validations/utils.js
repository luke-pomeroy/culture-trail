const { validationResult } = require("express-validator");

exports.handleValidationErrors = function (req, _res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = {};
    errors.array({ onlyFirstError: true })
          .forEach((e) => errorMessages[e.path] = e.msg);
    return next({ message: "Data Validation Error", 
                  errors: errorMessages 
    });
  }
  return next();
};