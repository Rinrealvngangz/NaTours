const express = require('express');
const toursController = require('../controller/toursController');

const router = express.Router();

//Router.param('id', toursController.checkID);
router.route('/top-5-cheap').get(toursController.aliasTopTour, toursController.getallTour);
router.route('/tour-stats').get(toursController.getTourStats);
router.route('/').get(toursController.getallTour).post(toursController.createTour);

router.route('/:id').get(toursController.getTour).patch(toursController.UpdateTour).delete(toursController.deleteTour);

module.exports = router;
