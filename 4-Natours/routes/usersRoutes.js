const express = require('express');

const usersCotroller = require('../controller/usersController');
const authController = require('../controller/authController');

const Router = express.Router();

Router.post('/signup', authController.singup);

Router.route('/').get(usersCotroller.getAllUser).post(usersCotroller.createUser);

Router.route('/:id').get(usersCotroller.getUser).patch(usersCotroller.updateUser).delete(usersCotroller.deleteUser);
module.exports = Router;
