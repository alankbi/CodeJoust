require('../../config/database');
const mongoose = require('mongoose');
const chai = require('chai');

const { expect } = chai;

describe('Database connection', () => {
  before(function (done) {
    this.timeout(10000);
    mongoose.connection.on('connected', done);
  });

  after((done) => {
    mongoose.disconnect(done);
  });

  it('connects to the database', (done) => {
    expect(mongoose.connection.readyState).to.equal(1);
    done();
  });
});
