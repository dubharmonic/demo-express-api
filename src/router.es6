'use strict';

const express = require('express');

const controllers = require('./controllers.es6');

const router = express.Router();

router.post('/people', controllers.createPerson);
router.get('/people/:id', controllers.getPerson);
router.put('/people/:id', controllers.updatePerson);
router.delete('/people/:id', controllers.deletePerson);
router.get('/people', controllers.getPeople);

module.exports = router;
