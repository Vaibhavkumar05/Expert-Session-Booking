const { validationResult } = require('express-validator');

const validateRequest = (req, _res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const details = errors.array().map((error) => ({
      field: error.path,
      message: error.msg,
    }));

    const err = new Error('Validation failed');
    err.status = 400;
    err.details = details;
    return next(err);
  }

  return next();
};

module.exports = validateRequest;
