'use strict';

const router = require('express').Router();
const { check } = require('express-validator');

const { validateFile, validateFields } = require('../middlewares');
const { allowedCollections, userIDExist } = require('../helpers');
const {
  uploadFileController,
  // updateImg,
  serveImg,
  uploadImgCloudinary,
} = require('../controllers');

router.post('/', validateFile, uploadFileController);

router.get(
  '/:collection/:id',
  [
    check('id', 'It is not a valid Mongo ID!').isMongoId(),
    check('collection').custom(c =>
      allowedCollections(c, ['users', 'products'])
    ),
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
    validateFields,
  ],
  // updateImg // Upload images to our server
  uploadImgCloudinary
);

module.exports = router;
