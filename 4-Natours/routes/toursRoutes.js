const express = require('express');
const toursController = require('../controller/toursController');
const authController = require('../controller/authController');
const reviewRouter = require('./reviewsRoutes');

const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);

//Router.param('id', toursController.checkID);
router.route('/top-5-cheap').get(toursController.aliasTopTour, toursController.getallTour);
router.route('/tour-stats').get(toursController.getTourStats);
router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    toursController.getMonthlyPlan
  );

router.route('/tours-within/:distance/center/:latlng/unit/:unit').get(toursController.getToursWithin);
// tours-within?distance=233&center=-40,45&unit=mi
// tours-within/233/center/-40,45/unit/mi

router.route('/distances/:latlng/unit/:unit').get(toursController.getDistances);

router
  .route('/')
  .get(toursController.getallTour)
  .post(authController.protect, authController.restrictTo('admin', 'lead-guide'), toursController.createTour);

router
  .route('/:id')
  .get(toursController.getTour)
  .patch(authController.protect, authController.restrictTo('admin', 'lead-guide'), toursController.UpdateTour)
  .delete(authController.protect, authController.restrictTo('admin', 'lead-guide'), toursController.deleteTour);

module.exports = router;
