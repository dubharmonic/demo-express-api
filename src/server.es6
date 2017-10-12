'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');

const router = require('./router.es6');

const server = express();

server.use(helmet());

server.use(
  bodyParser.urlencoded({
    extended: false
  })
);
server.use(bodyParser.json());

server.use(router);

server.listen(8080);

module.exports = server;
