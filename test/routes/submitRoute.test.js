const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../server');

describe('POST /api/submit', () => {
  after(() => {
    mongoose.disconnect();
    app.server.close();
  });

  it('returns success when fields are valid', (done) => {
    const data = {
      languageId: 34,
      code: 'print("Hello, world!")',
    };

    request(app)
      .post('/api/submit/')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200)
      // eslint-disable-next-line no-unused-vars
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
});
