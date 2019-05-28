/*
----register POST
validation returns json error
error when email exists
error when username exists
password hashed?

----login POST
validation returns json error
user doesn't exist - 404
password wrong

*/

const { expect } = require('chai');
const request = require('supertest');
const app = require('../../server');
const validate = require('../../validation/validate');

describe('POST /api/auth/register', () => {
  it('works', (done) => {
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
});
