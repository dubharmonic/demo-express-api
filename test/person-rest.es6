const assert = require('assert');
const request = require('supertest');
const factory = require('unionized').factory;

const server = require('../src/server.es6');

const personFactory = factory({ firstName: 'Jim', lastName: 'Kirk' });

describe('Person RESTful endpoints', () => {
  describe('POST', () => {
    it('should create a single person', done => {
      request(server)
        .post('/people')
        .send(personFactory.create())
        .expect('Content-Type', /json/)
        .expect(201, done);
    });

    it('should fail to create a person if firstName is missing', done => {
      request(server)
        .post('/people')
        .send(personFactory.create({ firstName: null }))
        .expect(400)
        .then(response => {
          assert.equal(response.body[0].message, 'firstName cannot be null');
          done();
        })
        .catch(done);
    });

    it('should fail to create a person if firstName is too short', done => {
      request(server)
        .post('/people')
        .send(personFactory.create({ firstName: 'A' }))
        .expect(400)
        .then(response => {
          assert.equal(response.body[0].message, 'firstName must be between 2 and 10 characters in length');
          done();
        })
        .catch(done);
    });

    it('should fail to create a person if firstName is too long', done => {
      request(server)
        .post('/people')
        .send(personFactory.create({ firstName: '01234567890' }))
        .expect(400)
        .then(response => {
          assert.equal(response.body[0].message, 'firstName must be between 2 and 10 characters in length');
          done();
        })
        .catch(done);
    });

    it('should fail to create a person if lastName is missing', done => {
      request(server)
        .post('/people')
        .send(personFactory.create({ firstName: null }))
        .expect(400)
        .then(response => {
          assert.equal(response.body[0].message, 'firstName cannot be null');
          done();
        })
        .catch(done);
    });

    it('should fail to create a person if lastName is too short', done => {
      request(server)
        .post('/people')
        .send(personFactory.create({ lastName: 'A' }))
        .expect(400)
        .then(response => {
          assert.equal(response.body[0].message, 'lastName must be between 2 and 10 characters in length');
          done();
        })
        .catch(done);
    });

    it('should fail to create a person if lastName is too long', done => {
      request(server)
        .post('/people')
        .send(personFactory.create({ lastName: '01234567890' }))
        .expect(400)
        .then(response => {
          assert.equal(response.body[0].message, 'lastName must be between 2 and 10 characters in length');
          done();
        })
        .catch(done);
    });
  });

  describe('GET', () => {
    it('should receive a single person', done => {
      request(server)
        .get('/people/1')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          assert.equal(response.body.id, 1);
          assert.equal(response.body.firstName, 'Jim');
          done();
        })
        .catch(done);
    });

    it('should receive a list of people', done => {
      request(server)
        .get('/people')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          assert.equal(response.body[0].firstName, 'Jim');
          done();
        })
        .catch(done);
    });

    it('should receive not found for an invalid id', done => {
      request(server)
        .get('/people/1000')
        .expect(404, done);
    });

    it('should receive enexpected error for an alpha id', done => {
      request(server)
        .get('/people/abc')
        .expect(500, done);
    });
  });

  describe('PUT', () => {
    it('should update a single person', done => {
      request(server)
        .put('/people/1')
        .send(personFactory.create({ firstName: 'Jimmy' }))
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    it('should fail when trying to update a nonexistant person', done => {
      request(server)
        .put('/people/1000')
        .send(personFactory.create({ firstName: 'Jimmy' }))
        .expect(404, done);
    });

    it('should fail to update a person with an alpha id', done => {
      request(server)
        .put('/people/abc')
        .send(personFactory.create({ firstName: 'Jimmy' }))
        .expect(500, done);
    });

    it('should fail to update a person if firstName is missing', done => {
      request(server)
        .put('/people/1')
        .send(personFactory.create({ firstName: null }))
        .expect(400)
        .then(response => {
          assert.equal(response.body[0].message, 'firstName cannot be null');
          done();
        })
        .catch(done);
    });

    it('should fail to update a person if firstName is too short', done => {
      request(server)
        .put('/people/1')
        .send(personFactory.create({ firstName: 'A' }))
        .expect(400)
        .then(response => {
          assert.equal(response.body[0].message, 'firstName must be between 2 and 10 characters in length');
          done();
        })
        .catch(done);
    });

    it('should fail to update a person if firstName is too long', done => {
      request(server)
        .put('/people/1')
        .send(personFactory.create({ firstName: '01234567890' }))
        .expect(400)
        .then(response => {
          assert.equal(response.body[0].message, 'firstName must be between 2 and 10 characters in length');
          done();
        })
        .catch(done);
    });

    it('should fail to update a person if lastName is missing', done => {
      request(server)
        .put('/people/1')
        .send(personFactory.create({ lastName: null }))
        .expect(400)
        .then(response => {
          assert.equal(response.body[0].message, 'lastName cannot be null');
          done();
        })
        .catch(done);
    });

    it('should fail to update a person if lastName is too short', done => {
      request(server)
        .put('/people/1')
        .send(personFactory.create({ lastName: 'A' }))
        .expect(400)
        .then(response => {
          assert.equal(response.body[0].message, 'lastName must be between 2 and 10 characters in length');
          done();
        })
        .catch(done);
    });

    it('should fail to update a person if lastName is too long', done => {
      request(server)
        .put('/people/1')
        .send(personFactory.create({ lastName: '01234567890' }))
        .expect(400)
        .then(response => {
          assert.equal(response.body[0].message, 'lastName must be between 2 and 10 characters in length');
          done();
        })
        .catch(done);
    });
  });

  describe('DELETE', () => {
    it('should delete a single person', done => {
      request(server)
        .delete('/people/1')
        .expect(204, done);
    });

    it('should have an empty list of people', done => {
      request(server)
        .get('/people')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          assert.equal(response.body.length, 0);
          done();
        })
        .catch(done);
    });

    it('should fail to delete a single person when the person is not found', done => {
      request(server)
        .delete('/people/1000')
        .expect(404, done);
    });

    it('should fail to delete a single person with an alpha id', done => {
      request(server)
        .delete('/people/abc')
        .expect(500, done);
    });
  });
});
