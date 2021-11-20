'use strict';

const router = require('express').Router();
const { check } = require('express-validator');

const {
  validateFile,
  validateFields,
  idExistUpload,
} = require('../middlewares');
const { allowedCollections, userIDExist } = require('../helpers');
const {
  uploadFileController,
  // updateImg, // Upload images to our server
  serveImg,
  updateImgCloudinary,
} = require('../controllers');

router.post('/', validateFile, uploadFileController);

router.get(
  '/:collection/:id',
  [
    check('id', 'It is not a valid Mongo ID!').isMongoId(),
    validateFields,
    check('collection').custom(c =>
      allowedCollections(c, ['users', 'products'])
    ),
    idExistUpload,
    validateFields,
  ],
  serveImg
);

router.put(
  '/:collection/:id',
  [
    validateFile,
    check('id', 'It is not a valid Mongo ID').isMongoId(),
    validateFields,
    check('collection').custom(c =>
      allowedCollections(c, ['users', 'products'])
    ),
    idExistUpload,
    validateFields,
  ],
  // updateImg // Upload images to our server
  updateImgCloudinary
);

module.exports = router;
