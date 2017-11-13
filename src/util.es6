'use strict';

const Sequelize = require('sequelize');

const util = {};

// const sequelizeConnection = new Sequelize({
//   url: process.env.DATABASE_URL,
//   dialect: 'postgres',
//   logging: false
// });

const sequelizeConnection = new Sequelize(process.env.DATABASE_URL);

util.getSequelizeConnection = () => {
  return sequelizeConnection;
};

util.initializeDataBase = () => {
  sequelizeConnection
    .query(
      'CREATE TABLE IF NOT EXISTS people ( id bigserial primary key, first_name varchar(10) NOT NULL, last_name varchar(10) NOT NULL, created timestamp NOT NULL, updated timestamp NOT NULL );'
    )
    .then(() => {
      console.log('Table created!', process.env.DATABASE_URL);
      process.exit(0);
    })
    .catch(error => {
      console.log('Problem creating table', process.env.DATABASE_URL, error);
      process.exit(1);
    });
};

module.exports = util;
