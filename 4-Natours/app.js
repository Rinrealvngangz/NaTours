const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const path = require('path');
const cookieParSer = require('cookie-parser');
const compression = require('compression');

const AppError = require('./utils/appError');
const globalErrorHandle = require('./controller/errorController');
const toursRouter = require('./routes/toursRoutes');
const usersRouter = require('./routes/usersRoutes');
const reviewRouter = require('./routes/reviewsRoutes');
const viewsRouter = require('./routes/viewsRoutes');
const bookingRouter = require('./routes/bookingRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//set security HTTP header
app.use(helmet()); //call helmet

//1)Global  Midleware

//Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// development loggin
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//giới hạn số lần req nhiều lần từ API,
const limiter = rateLimit({
  max: 100,
  windownMs: 60 * 60 * 1000,
  message: 'Too many request from this IP,please try again in an hour',
});
app.use('/api', limiter);

// Body parser ,reading data from Body into  req.body
app.use(express.json({ limit: '10kb' })); //limit string
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParSer());
//Data  sanitization agains NoSQL query injection
app.use(mongoSanitize()); //Chức năng khử trùng sẽ loại bỏ bất kỳ khóa nào bắt đầu bằng '$' trong đầu vào,
//Data sanitization agains xss
app.use(xss());

//prevent parameter pollution
//?sort=duration&sort=price =>[duration,price]
app.use(
  hpp({
    whitelist: ['duration', 'ratingsAverage', 'ratingsQuantity', 'maxGroupSize', 'price', 'difficulty'],
  })
);

app.use(compression());

app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});
//Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);

  next();
});

//2) Router
app.use('/', viewsRouter);
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

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
