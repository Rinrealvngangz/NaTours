const express = require('express');
const toursController = require('../controller/toursController');
const authController = require('../controller/authController');
const reviewRouter = require('./reviewsRoutes');

const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);

//Router.param('id', toursController.checkID);
router.route('/top-5-cheap').get(toursController.aliasTopTour, toursController.getallTour);
router.route('/tour-stats').get(toursController.getTourStats);
router.route('/monthly-plan/:year').get(toursController.getMonthlyPlan);
router.route('/').get(authController.protect, toursController.getallTour).post(toursController.createTour);

router.route('/:id').get(toursController.getTour).patch(toursController.UpdateTour).delete(toursController.deleteTour);

module.exports = router;
