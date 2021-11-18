'use strict';

const { request, response } = require('express');
const { ObjectId } = require('mongoose').Types;

const User = require('./../models/user.model.db.js');
const Category = require('./../models/category.model.db.js');
const Product = require('./../models/product.model.db.js');

const allowedCollections = ['users', 'categories', 'products'];

const searchUsers = async (query = '', res = response) => {
  const isValidMongoId = ObjectId.isValid(query);

  if (isValidMongoId) {
    const user = await User.findById(query);
    return res.json({ results: user && user.state ? [user] : [] });
  }

  const regex = new RegExp(query, 'i');
  const users = await User.find({
    $or: [{ name: regex }, { mail: regex }],
    $and: [{ state: true }],
  });

  return res.json({
    results: users,
  });
};

const searchQuery = async (req = request, res = response) => {
  try {
    const { collection, query } = req.params;

    if (!allowedCollections.includes(collection))
      return res
        .status(400)
        .json({ msg: `The collection '${collection}' does not exists!` });

    switch (collection) {
      case 'users':
        searchUsers(query, res);
        break;

      case 'categories':
        break;

      case 'products':
        break;

      default:
        return res.status(500).json({ msg: 'Something went wrong!' });
    }

    return res.status(200).json({ msg: 'seoamdy' });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ err });
  }
};

module.exports = {
  searchQuery,
};
