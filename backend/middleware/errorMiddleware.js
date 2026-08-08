const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  logger.error({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    method: req.method,
    url: req.url,
  });

  const isClientError = statusCode >= 400 && statusCode < 500;

  res.status(statusCode).json({
    message: isClientError ? err.message : 'Internal server error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { errorHandler };