const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signtoken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

exports.singup = catchAsync(async (req, res, next) => {
  const newsUser = await User.create(req.body);
  const token = signtoken(newsUser._id);
  res.status(201).json({
    token,
    status: 'success',
    data: {
      user: newsUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('please provide email and password'), 400);
  }
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  const token = signtoken(user._id);

  res.status(200).json({
    status: 'success',
    token,
  });
});
