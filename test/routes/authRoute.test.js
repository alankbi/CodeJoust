const { expect } = require('chai');
const request = require('supertest');
const sinon = require('sinon');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const app = require('../../server');
const validate = require('../../validation/validate');

describe('POST /api/auth/register', () => {
  afterEach(() => {
    sinon.restore();
  });

  after(() => {
    mongoose.disconnect();
    app.server.close();
  });

  it('returns error when validation fails', (done) => {
    const user = {
      username: '',
    };
    const result = {
      username: validate.errorMessages.missingUsername,
      email: validate.errorMessages.missingEmail,
      password: validate.errorMessages.missingPassword,
    };

    request(app)
      .post('/api/auth/register')
      .send(user)
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.body).to.deep.equal(result);
          done();
        }
      });
  });

  it('returns error when email/username already exists', (done) => {
    const user = {
      username: 'test',
      email: 'test@email.com',
      password: 'testpassword',
      confirmPassword: 'testpassword',
    };
    const result = {
      username: validate.errorMessages.existingUsername,
      email: validate.errorMessages.existingEmail,
    };

    const User = mongoose.model('User');
    const stub = sinon.stub(User, 'find');
    stub.resolves([{ username: 'test', email: 'test@email.com' }]);

    request(app)
      .post('/api/auth/register')
      .send(user)
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.body).to.deep.equal(result);
          done();
        }
      });
  });

  it('succeeds and hashes the password', (done) => {
    const plainPassword = 'testpassword';
    const user = {
      username: 'test',
      email: 'test@email.com',
      password: plainPassword,
      confirmPassword: plainPassword,
    };

    const User = mongoose.model('User');
    const findStub = sinon.stub(User, 'find');
    findStub.resolves(null);

    const saveStub = sinon.stub(User.prototype, 'save');
    saveStub.resolvesThis(); // So that .then((userInfo) ...) continues to work

    request(app)
      .post('/api/auth/register')
      .send(user)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.body).to.have.any.keys('password');
          expect(res.body.password).to.not.equal(plainPassword);
          done();
        }
      });
  });
});

describe('POST /api/auth/login', () => {
  afterEach(() => {
    sinon.restore();
  });

  after(() => {
    mongoose.disconnect();
    app.server.close();
  });

  it('returns error when validation fails', (done) => {
    const user = {
      username: '',
    };
    const result = {
      username: validate.errorMessages.missingUsername,
      password: validate.errorMessages.missingPassword,
    };

    request(app)
      .post('/api/auth/login')
      .send(user)
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.body).to.deep.equal(result);
          done();
        }
      });
  });

  it('fails when password is incorrect', (done) => {
    const user = {
      username: 'test',
      password: 'wrongpassword',
    };
    const result = {
      password: validate.errorMessages.wrongPassword,
    };

    const User = mongoose.model('User');
    const findOneStub = sinon.stub(User, 'findOne');
    findOneStub.resolves({ username: 'test', password: 'testpassword', id: 1 });

    request(app)
      .post('/api/auth/login')
      .send(user)
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.body).to.deep.equal(result);
          done();
        }
      });
  });

  it('succeeds when account info is correct', (done) => {
    const user = {
      username: 'test',
      password: 'testpassword',
    };

    const User = mongoose.model('User');
    const findOneStub = sinon.stub(User, 'findOne');
    findOneStub.resolves({ username: 'test', password: 'testpassword', id: 1 });

    const bcryptStub = sinon.stub(bcrypt, 'compare');
    bcryptStub.resolves(true);

    request(app)
      .post('/api/auth/login')
      .send(user)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.body.success).to.be.true;
          expect(res.body).to.have.any.keys('token');
          done();
        }
      });
  });
});
