const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.singup = catchAsync(async (req, res, next) => {
  const newsUser = await User.create(req.body);
  const token = jwt.sign({ id: newsUser._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
  res.status(201).json({
    token,
    status: 'success',
    data: {
      user: newsUser,
    },
  });
});
