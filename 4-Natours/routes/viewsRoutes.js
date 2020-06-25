const express = require('express');
const viewsController = require('../controller/viewsController');
const authController = require('../controller/authController');

const route = express.Router();

route.get('/', viewsController.getOverview);

route.get('/tour/:slug', authController.protect, viewsController.getTour);

route.get('/login', viewsController.getLoginForm);

module.exports = route;
