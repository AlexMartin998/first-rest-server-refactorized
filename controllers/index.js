'use strict';

const usersController = require('./users.controller.js');
const authController = require('./auth.controller.js');

module.exports = {
  ...usersController,
  ...authController,
};
