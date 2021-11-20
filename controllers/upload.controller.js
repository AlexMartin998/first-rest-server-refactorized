'use strict';

const { request, response } = require('express');
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

const User = require('./../models/user.model.db.js');
const Product = require('./../models/product.model.db.js');
const { uploadFile } = require('../helpers');
const { CLOUDINARY_URL } = require('../config');

cloudinary.config(CLOUDINARY_URL);

// TODO: Refactorizar: Middleware / Helper q se utilice aqui

const uploadFileController = async (req = request, res = response) => {
  try {
    // const fileName = await uploadFile(req.files, ['txt', 'md'], 'textFiles');
    // const fileName = await uploadFile(req.files, ['pdf'], 'pdf');
    const fileName = await uploadFile(req.files, undefined, 'images');

    res.status(201).json({ fileName });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
};

const serveImg = async (req = request, res = response) => {
  const { collection, id } = req.params;
  const placeholder = path.join(__dirname, './../assets/nope-not-here.png');
  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if (!model)
        return res
          .status(400)
          .json({ msg: `${collection} ID: ${id} doesn't exist!` });
      break;

    case 'products':
      model = await Product.findById(id);
      if (!model)
        return res
          .status(400)
          .json({ msg: `${collection} ID: ${id} doesn't exist!` });
      break;

    default:
      return res.status(500).json({ msg: 'Collection not allowed!' });
  }

  // Clear previous images
  if (model.img) {
    const imgPath = path.join(__dirname, './../uploads', collection, model.img);
    if (fs.existsSync(imgPath)) return res.sendFile(imgPath);
  }

  res.sendFile(placeholder);
};

const updateImg = async (req = request, res = response) => {
  const { collection, id } = req.params;
  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if (!model)
        return res
          .status(400)
          .json({ msg: `${collection} ID '${id}' doesn't exist!` });
      break;

    case 'products':
      model = await Product.findById(id);
      if (!model)
        return res
          .status(400)
          .json({ msg: `${collection} ID: ${id} doesn't exist!` });
      break;

    default:
      return res.status(500).json({ msg: 'Collection not allowed!' });
  }

  if (model.img) {
    const imgPath = path.join(__dirname, './../uploads', collection, model.img);
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
  }

  try {
    const fileName = await uploadFile(req.files, undefined, collection);
    model.img = fileName;
    await model.save();
    res.json({
      msg: 'Updated!',
      model,
    });
  } catch (err) {
    res.status(400).json({ err });
  }
};

const uploadImgCloudinary = async (req = request, res = response) => {
  const { collection, id } = req.params;
  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if (!model)
        return res
          .status(400)
          .json({ msg: `${collection} ID: ${id} doesn't exist!` });
      break;

    case 'products':
      model = await Product.findById(id);
      if (!model)
        return res
          .status(400)
          .json({ msg: `${collection} ID: ${id} doesn't exist!` });
      break;

    default:
      return res.status(500).json({ msg: 'Collection not allowed!' });
  }

  // Clear previous images
  if (model.img) {
    const arrName = model.img.split('/');
    const [public_id] = arrName.at(-1).split('.');
    cloudinary.uploader.destroy(public_id);
  }

  // Upload img
  const { tempFilePath } = req.files.file;
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
  model.img = secure_url;

  await model.save();

  res.json({
    msg: 'Updated!',
    model,
  });
};

// TODO: Serve img <- Claudinary


module.exports = {
  uploadFileController,
  serveImg,
  updateImg,
  uploadImgCloudinary,
};
