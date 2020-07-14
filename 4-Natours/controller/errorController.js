const AppError = require('../utils/appError');

const HadleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;

  return new AppError(message, 400);
};

const handleJWTError = () => new AppError('Invalid token ,Please login again!', 401);
const habdleJWTExpiredError = () => new AppError('Your token has expired ! Please log in again.', 401);
const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  //console.log(value);
  const message = `Duplicate field value: ${value}. Please use another value`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};
const sendErrorDev = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    // API
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stacks: err.stacks,
    });
  } //REDERRED WEBSITE
  console.error('ERROR...', err);

  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong',
    msg: err.message,
  });
};
const sendErrorProd = (err, req, res) => {
  //A) API
  if (req.originalUrl.startsWith('/api')) {
    //A) Operational trusted error:send message to client
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    // B )Programing or orther unknwon error:don't leak error details
    //1)Log
    console.error('ERROR...', err);
    //2)Send generic message
    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
  //B) REder Website
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong',
      msg: err.message,
    });
  }
  console.error('ERROR...', err);
  //2)Send generic message
  return res.status(err.statusCode).render('error', {
    title: 'Please try again later.',
    msg: err.message,
  });
};

module.exports = (err, req, res, next) => {
  //console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    if (error.name === 'CastError') error = HadleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = habdleJWTExpiredError();

    sendErrorProd(error, req, res);
  }
};
