const express = require('express');
const toursController = require('../controller/toursController');

const router = express.Router();

//Router.param('id', toursController.checkID);

router.route('/').get(toursController.getallTour).post(toursController.createTour);

router.route('/:id').get(toursController.getTour).patch(toursController.UpdateTour).delete(toursController.deleteTour);

module.exports = router;
