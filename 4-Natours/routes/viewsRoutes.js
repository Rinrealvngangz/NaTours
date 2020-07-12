const express = require('express');
const viewsController = require('../controller/viewsController');
const authController = require('../controller/authController');
const bookingController = require('../controller/bookingController');

const route = express.Router();

route.get('/', bookingController.createBookingCheckout, authController.isLoggedIn, viewsController.getOverview);

route.get('/tour/:slug', authController.isLoggedIn, viewsController.getTour);

route.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
route.get('/me', authController.protect, viewsController.getAccount);
route.get('/my-tours', authController.protect, viewsController.getMyTours);
route.post('/submit-user-data', authController.protect, viewsController.updateUserData);
module.exports = route;
