'use strict';

const validateFields = require('./validate-fields.middleware.js');
const validateRole = require('./validate-role.middleware.js');
const validateJSW = require('./validate-jwt.middleware.js');

module.exports = {
  ...validateFields,
  ...validateRole,
  ...validateJSW,
};
