const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandle = require('./controller/errorController');
const toursRouter = require('./routes/toursRoutes');
const usersRouter = require('./routes/usersRoutes');

const app = express();

//1) Midleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//2) Router
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server !`,
  // });
  // const err = new Error(`Can't find ${req.originalUrl} on this server !`);
  // err.status = 'fail';
  // err.statusCode = 404;
  next(new AppError(`Can't find ${req.originalUrl} on this server !`, 404));
});

app.use(globalErrorHandle);

module.exports = app;
