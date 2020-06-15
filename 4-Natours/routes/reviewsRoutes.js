const express = require('express');
const reviewsController = require('../controller/reviewsController');
const authController = require('../controller/authController');

const router = express.Router();

router
  .route('/')
  .get(reviewsController.getAllReview)
  .post(authController.protect, authController.restrictTo('user'), reviewsController.createReview);

module.exports = router;
