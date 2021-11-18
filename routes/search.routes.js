'use strict';

const router = require('express').Router();

const { searchQuery } = require('../controllers');

router.get('/:collection/:query', searchQuery);

module.exports = router;
