[![CircleCI](https://circleci.com/gh/dubharmonic/demo-server-express-restful-api.svg?&style=shield)](https://circleci.com/gh/dubharmonic/demo-server-express-restful-api)
[![Known Vulnerabilities](https://snyk.io/test/github/dubharmonic/demo-server-express-restful-api/badge.svg)](https://snyk.io/test/github/dubharmonic/demo-server-express-restful-api)

# demo-server-express-restful-api

This project is a simple demo of a RESTful JSON API written with ECMAScript 6 and Express. It's a continual work in progress.

1. You'll need a Postgres 9.6 database running, and a `DATABASE_URL` env variable set with the connection string.

2. Install dependencies

        yarn install

3. Create the table

        yarn db-init

4. Run the tests

        yarn coverage

5. Start the server

        yarn dev


The API will be available at `http://localhost:8080`
