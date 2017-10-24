'use strict';

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL
});
client.connect();

client.query('SELECT NOW()', (err, res) => {
  console.log(err, res);
  client.end();
});

const Sequelize = require('sequelize');

const sequelize = new Sequelize({ url: process.env.DATABASE_URL, dialect: 'postgres', logging: false });

sequelize
  .query(
    'CREATE TABLE people ( id bigserial primary key, first_name varchar(10) NOT NULL, last_name varchar(10) NOT NULL, created timestamp NOT NULL, updated timestamp NOT NULL );'
  )
  .then(() => {
    console.log('Table created!');
    process.exit(0);
  })
  .catch(error => {
    console.log('Problem creating table', error);
    process.exit(1);
  });

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('DB Connected');
//   })
//   .catch(error => {
//     console.log("Can't connect to database", error);
//     process.exit(1);
//   });

// sequelize
//   .query('DROP TABLE people;')
//   .then(() => {
//     console.log('Table dropped!');
//     sequelize
//       .query(
//         'CREATE TABLE people ( id bigserial primary key, first_name varchar(10) NOT NULL, last_name varchar(10) NOT NULL, created timestamp NOT NULL, updated timestamp NOT NULL );'
//       )
//       .then(() => {
//         console.log('Table created!');
//         process.exit(0);
//       })
//       .catch(error => {
//         console.log('Problem creating table', error);
//         process.exit(1);
//       });
//   })
//   .catch(error => {
//     console.log('Problem dropping table', error);
//     process.exit(1);
//   });
