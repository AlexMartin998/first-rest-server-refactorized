'use strict';
const { request, response } = require('express');

const Category = require('./../models/category.model.db.js');
const Product = require('./../models/product.model.db.js');

const categoryIDNameExist = async (req = request, res = response, next) => {
  const { id } = req.params;
  const { newName } = req.body;

  const category = await Category.findById(id);

  if (!category || !category.state)
    return res.status(400).json({ msg: `Ctegory ID '${id}' doesn't exist!` });

  if (!newName) return next(); // 'Cause it's not necessary to delete
  const categoryName = await Category.findOne({ name: newName.toUpperCase() });

  if (newName.toUpperCase() === category.name)
    return res.status(400).json({ msg: 'New name must not be the same!' });

  if (categoryName)
    return res
      .status(400)
      .json({ msg: `Category '${newName}' already exists!` });

  next();
};

/* Si me envian name and new name
 const Category = require('./../models/category.model.db.js');

const categoryIDNameExist = async (req = request, res = response, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await Category.findById(id);

  if (!category || !category.state)
    return res.status(400).json({ msg: `Ctegory ID '${id}' doesn't exist!` });

  const categoryName = await Category.findOne({ name: name.toUpperCase() });

  if (!categoryName || !categoryName.state)
    return res
      .status(400)
      .json({ msg: `Category '${name}' does not exist!` });

  next();
};
 */

module.exports = {
  categoryIDNameExist,
};
