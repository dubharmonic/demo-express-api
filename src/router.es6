'use strict';

const express = require('express');

const controllers = require('./controllers.es6');

const router = express.Router();

router.get('/', controllers.base);

module.exports = router;
