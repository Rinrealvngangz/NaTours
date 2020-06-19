const express = require('express');
const reviewsController = require('../controller/reviewsController');
const authController = require('../controller/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .get(reviewsController.getAllReview)
  .post(authController.restrictTo('user'), reviewsController.setTourUserIDs, reviewsController.createReview);

router
  .route('/:id')
  .get(reviewsController.getReview)
  .patch(authController.restrictTo('user', 'admin'), reviewsController.updateReview)
  .delete(authController.restrictTo('user', 'admin'), reviewsController.deleteReview);

module.exports = router;
