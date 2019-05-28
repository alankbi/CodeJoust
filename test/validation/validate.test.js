/*
----validateRegisterInput
password invalid

----validateLoginInput
fields null/empty

*/

const { expect } = require('chai');
const validate = require('../../validation/validate');

describe('validateRegisterInput function', () => {
  let data = {};
  let result = {};

  beforeEach(() => {
    data = {
      username: 'test',
      email: 'test@email.com',
      password: 'testpassword',
      confirmPassword: 'testpassword',
    };
    result = {};
  });

  it('passes when fields are all valid', () => {
    const { isValid, errors } = validate.validateRegisterInput(data);

    expect(isValid).to.be.true;
    expect(errors).to.deep.equal(result);
  });

  it('fails when fields are null or empty', () => {
    data.username = '';
    delete data.confirmPassword;

    result.username = validate.errorMessages.missingUsername;
    result.password = validate.errorMessages.missingPassword;

    const { isValid, errors } = validate.validateRegisterInput(data);

    expect(isValid).to.be.false;
    expect(errors).to.deep.equal(result);
  });

  it('fails when the email is invalid', () => {
    data.email = 'invalid.email';
    result.email = validate.errorMessages.invalidEmail;

    const { isValid, errors } = validate.validateRegisterInput(data);

    expect(isValid).to.be.false;
    expect(errors).to.deep.equal(result);
  });

  it('fails when the passwords do not match', () => {
    data.confirmPassword = 'doesnotmatch';
    result.password = validate.errorMessages.nonMatchingPassword;

    const { isValid, errors } = validate.validateRegisterInput(data);

    expect(isValid).to.be.false;
    expect(errors).to.deep.equal(result);
  });

  it('fails when the password is too short', () => {
    data.password = 'short';
    result.password = validate.errorMessages.invalidPassword;

    const { isValid, errors } = validate.validateRegisterInput(data);

    expect(isValid).to.be.false;
    expect(errors).to.deep.equal(result);
  });
});

describe('validateLoginInput function', () => {
  let data = {};
  let result = {};

  beforeEach(() => {
    data = {
      username: 'test',
      password: 'testpassword',
    };
    result = {};
  });

  it('succeeds when fields are valid', () => {
    const { isValid, errors } = validate.validateLoginInput(data);

    expect(isValid).to.be.true;
    expect(errors).to.deep.equal(result);
  });

  it('fails when fields are null or empty', () => {
    data.username = '';
    delete data.password;

    result.username = validate.errorMessages.missingUsername;
    result.password = validate.errorMessages.missingPassword;

    const { isValid, errors } = validate.validateLoginInput(data);

    expect(isValid).to.be.false;
    expect(errors).to.deep.equal(result);
  });
});
