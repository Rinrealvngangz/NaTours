const express = require('express');
const viewsController = require('../controller/viewsController');

const route = express.Router();

route.get('/', viewsController.getOverview);

route.get('/tour/:slug', viewsController.getTour);

route.get('/login', viewsController.getLoginForm);

module.exports = route;
