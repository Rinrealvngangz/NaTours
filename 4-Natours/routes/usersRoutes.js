const express = require('express');

const usersCotroller = require('../controller/usersController');
const authController = require('../controller/authController');

const Router = express.Router();

Router.post('/signup', authController.singup);
Router.post('/login', authController.login);

Router.post('/forgotPassword', authController.forgotPassword);
Router.patch('/resetPassword/:token', authController.resetPassword);
Router.patch('/updateMyPassword', authController.protect, authController.updatePassword);
Router.route('/').get(usersCotroller.getAllUser).post(usersCotroller.createUser);

Router.route('/:id').get(usersCotroller.getUser).patch(usersCotroller.updateUser).delete(usersCotroller.deleteUser);
module.exports = Router;
