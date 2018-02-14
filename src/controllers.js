const models = require('./models');

const controllers = {};

controllers.createPerson = async (req, res) => {
  try {
    const person = await models.Person.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    return res.status(201).json(person);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json(error.errors);
    }
    return res.status(500).send();
  }
};

controllers.getPerson = async (req, res) => {
  try {
    const person = await models.Person.find({
      where: {
        id: req.params.id,
      },
    });
    if (person) {
      return res.status(200).json(person);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send();
  }
};

controllers.updatePerson = async (req, res) => {
  try {
    const person = await models.Person.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (person) {
      person.firstName = req.body.firstName;
      person.lastName = req.body.lastName;
      await person.save();
      return res.status(200).json(person);
    }
    return res.status(404).send();
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json(error.errors);
    }
    return res.status(500).send();
  }
};

controllers.deletePerson = async (req, res) => {
  try {
    const person = await models.Person.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (person) {
      await person.destroy();
      return res.status(204).send();
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send();
  }
};

controllers.getPeople = async (req, res) => {
  try {
    const people = await models.Person.findAll();
    return res.status(200).json(people);
  } catch (error) {
    return res.status(500).send();
  }
};

module.exports = controllers;
