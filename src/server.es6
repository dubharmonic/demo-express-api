'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const session = require('cookie-session');

const router = require('./router.es6');

const server = express();

server.use(helmet());

server.use(
  bodyParser.urlencoded({
    extended: false
  })
);
server.use(bodyParser.json());

server.use(
  session({
    name: 'session',
    keys: [
      new Buffer(`${Math.random()}${Math.random()}`).toString('hex'),
      new Buffer(`${Math.random()}${Math.random()}`).toString('hex')
    ],
    cookie: {
      secure: true,
      httpOnly: true,
      domain: 'localhost:8080',
      expires: new Date(Date.now() + 60 * 60 * 1000) // 1 hour
    }
  })
);

server.use(router);

server.listen(8080);

module.exports = server;
