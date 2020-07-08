const express = require('express');

const usersCotroller = require('../controller/usersController');
const authController = require('../controller/authController');
//const router = require('./reviewsRoutes');

const Router = express.Router();

Router.post('/signup', authController.singup);
Router.post('/login', authController.login);
Router.get('/logout', authController.logout);
Router.post('/forgotPassword', authController.forgotPassword);
Router.patch('/resetPassword/:token', authController.resetPassword);

//Protect all routes after this middleware
Router.use(authController.protect);

Router.patch('/updateMyPassword', authController.updatePassword);
Router.get('/me', usersCotroller.getMe, usersCotroller.getUser);
Router.patch('/updateMe', usersCotroller.uploadUesrPhoto, usersCotroller.resizeUserPhoto, usersCotroller.updateMe);
Router.delete('/deleteMe', usersCotroller.DeleteMe);

Router.use(authController.restrictTo('admin'));

Router.route('/').get(usersCotroller.getAllUser).post(usersCotroller.createUser);

Router.route('/:id').get(usersCotroller.getUser).patch(usersCotroller.updateUser).delete(usersCotroller.deleteUser);

module.exports = Router;
