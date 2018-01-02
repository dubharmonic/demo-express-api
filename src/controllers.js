const models = require('./models');

const controllers = {};

controllers.createPerson = (req, res) => {
  models.Person.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName
  })
    .then(person => {
      return res.status(201).json(person);
    })
    .catch(error => {
      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json(error.errors);
      } else {
        return res.status(500).send();
      }
    });
};

controllers.getPerson = (req, res) => {
  models.Person.find({
    where: {
      id: req.params.id
    }
  })
    .then(person => {
      if (person) {
        return res.status(200).json(person);
      } else {
        return res.status(404).send();
      }
    })
    .catch(() => {
      return res.status(500).send();
    });
};

controllers.updatePerson = (req, res) => {
  console.log('hello?');
  models.Person.findOne({
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
            return res.status(200).json(person);
          })
          .catch(error => {
            if (error.name === 'SequelizeValidationError') {
              res.status(400).json(error.errors);
            } else {
              return res.status(500).send();
            }
          });
      } else {
        return res.status(404).send();
      }
    })
    .catch(() => {
      return res.status(500).send();
    });
};

controllers.deletePerson = (req, res) => {
  models.Person.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(person => {
      if (person) {
        person
          .destroy()
          .then(() => {
            return res.status(204).send();
          })
          .catch(() => {
            return res.status(500).send();
          });
      } else {
        return res.status(404).send();
      }
    })
    .catch(() => {
      return res.status(500).send();
    });
};

controllers.getPeople = (req, res) => {
  models.Person.findAll()
    .then(people => {
      return res.status(200).json(people);
    })
    .catch(() => {
      return res.status(500).send();
    });
};

module.exports = controllers;
