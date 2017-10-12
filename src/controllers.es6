'use strict';

const models = require('./models.es6');

const controllers = {};

controllers.createPerson = (req, res) => {
  models.Person
    .create({
      firstName: req.body.firstName,
      lastName: req.body.lastName
    })
    .then(person => {
      res.status(201).json(person);
    })
    .catch(error => {
      if (error.name === 'SequelizeValidationError') {
        res.status(400).json(error.errors);
      } else {
        res.status(500).json(error);
      }
    });
};

controllers.getPerson = (req, res) => {
  models.Person
    .find({
      where: {
        id: req.params.id
      }
    })
    .then(person => {
      if (person) {
        res.status(200).json(person);
      } else {
        res.status(404).send();
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
};

controllers.updatePerson = (req, res) => {
  models.Person
    .findOne({
      where: {
        id: req.params.id
      }
    })
    .then(person => {
      if (person) {
        person.firstName = req.body.firstName;
        person.lastName = req.body.lastName;
        person
          .save()
          .then(() => {
            res.status(200).json(person);
          })
          .catch(error => {
            if (error.name === 'SequelizeValidationError') {
              res.status(400).json(error.errors);
            } else {
              res.status(500).json(error);
            }
          });
      } else {
        res.status(404).send();
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
};

controllers.deletePerson = (req, res) => {
  models.Person
    .findOne({
      where: {
        id: req.params.id
      }
    })
    .then(person => {
      if (person) {
        person
          .destroy()
          .then(() => {
            res.status(204).send();
          })
          .catch(error => {
            res.status(500).json(error);
          });
      } else {
        res.status(404).send();
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
};

controllers.getPeople = (req, res) => {
  models.Person
    .findAll()
    .then(people => {
      res.status(200).json(people);
    })
    .catch(error => {
      res.status(500).json(error);
    });
};

module.exports = controllers;
