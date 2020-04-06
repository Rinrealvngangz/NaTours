const express = require('express');
const Router = express.Router();
const usersCotroller = require('./../controller/usersController');
Router.route('/')
  .get(usersCotroller.getAllUser)
  .post(usersCotroller.createUser);

Router.route('/:id')
  .get(usersCotroller.getUser)
  .patch(usersCotroller.updateUser)
  .delete(usersCotroller.deleteUser);
module.exports = Router;
