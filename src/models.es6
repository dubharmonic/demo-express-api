'use strict';

const Sequelize = require('sequelize');

const util = require('./util.es6');

const models = {};

models.Person = util.sequelizeConnection.define('people', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'first_name',
    validate: {
      len: {
        args: [2, 10],
        msg: 'firstName must be between 2 and 10 characters in length'
      }
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'last_name',
    validate: {
      len: {
        args: [2, 10],
        msg: 'lastName must be between 2 and 10 characters in length'
      }
    }
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false,
    field: 'created'
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false,
    field: 'updated'
  }
});

module.exports = models;
