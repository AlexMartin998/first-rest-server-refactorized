'use strict';

const User = require('./../models/user.model.db.js');
const Role = require('./../models/role.model.db.js');

const isAlreadyRegistered = async (email = '') => {
  const emailExist = await User.findOne({ email });
  if (emailExist)
    throw new Error(`The email '${email}' is already registered!`);
};

const userIDExist = async (id = '') => {
  const user = await User.findById(id);
  if (!user) throw new Error(`User ID: ${id} does not exist! - in Db`);
  if (!user.state) throw new Error(`User doesn't exist - State = False`);
};

const isValidRole = async (role = '') => {
  const roleExist = await Role.findOne({ role });
  if (!roleExist)
    throw new Error(`The role: ${role} is not valid in this app.`);
};

/* const existInUserCollect = async (someData = '') => {
  const alreadyExist = await User.findOne({ someData });
  if (!alreadyExist)
    throw new Error(
      `${
        someData.includes('@')
          ? 'The email ' + someData + 'already registered!'
          : ''
      }`
    );
}; */

module.exports = {
  isAlreadyRegistered,
  userIDExist,
  isValidRole,
};
