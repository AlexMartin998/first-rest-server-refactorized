'use strict';

const { request, response } = require('express');
const { ObjectId } = require('mongoose').Types;

const User = require('./../models/user.model.db.js');
const Category = require('./../models/category.model.db.js');
const Product = require('./../models/product.model.db.js');

const allowedCollections = ['users', 'categories', 'products'];

const genRegex = (query = '') => new RegExp(query, 'i');

const searchUsers = async (query = '', res = response) => {
  const isValidMongoId = ObjectId.isValid(query);

  if (isValidMongoId) {
    const user = await User.findById(query);
    return res.json({ results: user && user.state ? [user] : [] });
  }

  const regex = genRegex(query);

  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ state: true }],
  });

  res.json({
    results: users,
  });
};

const searchCategories = async (query = '', res = response) => {
  const isValidMongoId = ObjectId.isValid(query);

  if (isValidMongoId) {
    const category = await Category.findById(query);
    return res.json({
      results: category && category.state ? [category] : [],
    });
  }

  const regex = genRegex(query);

  const category = await Category.find({
    name: regex,
    state: true,
  });

  res.json({ results: category });
};

const searchProducts = async (query = '', res = response) => {
  const isValidMongoId = ObjectId.isValid(query);

  if (isValidMongoId) {
    const product = await Product.findById(query).populate('category', 'name');
    return res.json({
      results: product && product.state ? [product] : [],
    });
  }

  const regex = genRegex(query);

  const product = await Product.find({
    name: regex,
    state: true,
  }).populate('category', 'name');

  res.json({ results: product });
};

const searchQuery = (req = request, res = response) => {
  const { collection, query } = req.params;

  if (!allowedCollections.includes(collection))
    return res
      .status(400)
      .json({ msg: `Collection: ${collection} is not an allowed collection.` });

  switch (collection) {
    case 'users':
      searchUsers(query, res);
      break;
    case 'category':
      searchCategories(query, res);
      break;
    case 'products':
      searchProducts(query, res);
      break;
    case 'roles':
      break;
    default:
      res.status(500).json({ msg: 'Something went wrong!' });
  }
};

module.exports = {
  searchQuery,
};
