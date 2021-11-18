'use strict';

const router = require('express').Router();

const { searchQuery } = require('../controllers');
const { validateFields } = require('../middlewares');

router.get('/:collection/:query', [validateFields], searchQuery);

module.exports = router;
