const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');

const router = require('./router');

const server = express();

server.use(helmet());

server.use(bodyParser.urlencoded({ extended: false }));

server.use(bodyParser.json());

server.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});

server.use(router);

server.listen(8081);

module.exports = server;
