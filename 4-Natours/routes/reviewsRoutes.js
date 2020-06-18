const express = require('express');
const reviewsController = require('../controller/reviewsController');
const authController = require('../controller/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(reviewsController.getAllReview)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewsController.setTourUserIDs,
    reviewsController.createReview
  );

router
  .route('/:id')
  .get(reviewsController.getReview)
  .patch(reviewsController.updateReview)
  .delete(reviewsController.deleteReview);

module.exports = router;
