const Sequelize = require('sequelize');

const util = {};

if (!process.env.DATABASE_URL) {
  console.error('Please provide a database URL!');
  process.exit(1);
}

util.sequelizeConnection = new Sequelize(process.env.DATABASE_URL);

util.initializeDatabase = () => {
  util.sequelizeConnection
    .query(
      'CREATE TABLE IF NOT EXISTS people ( id bigserial primary key, first_name varchar(10) NOT NULL, last_name varchar(10) NOT NULL, created timestamp NOT NULL, updated timestamp NOT NULL );'
    )
    .then(() => {
      console.log('Table created!');
      process.exit(0);
    })
    .catch(error => {
      console.log('Problem creating table', error);
      process.exit(1);
    });
};

module.exports = util;
