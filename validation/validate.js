const Validator = require('validator');
const isEmpty = require('is-empty');

const errorMessages = {
  missingUsername: 'Please enter a username',
  existingUsername: 'This username already exists',
  nonexistentUsername: 'This username does not exist',
  missingEmail: 'Please enter an email',
  invalidEmail: 'Please enter a valid email',
  existingEmail: 'This email already exists',
  missingPassword: 'Please enter a password',
  invalidPassword: 'Password must be between 8 and 30 characters',
  wrongPassword: 'Password is incorrect',
  nonMatchingPassword: 'Passwords must match',
};

// Ensure fields are not empty, email is valid, and passwords are valid/matching
function validateRegisterInput(data) {
  const errors = {};

  const parsedData = {};
  parsedData.username = !isEmpty(data.username) ? data.username : '';
  parsedData.email = !isEmpty(data.email) ? data.email : '';
  parsedData.password = !isEmpty(data.password) ? data.password : '';
  parsedData.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : '';

  if (Validator.isEmpty(parsedData.username)) {
    errors.username = errorMessages.missingUsername;
  }

  if (Validator.isEmpty(parsedData.email)) {
    errors.email = errorMessages.missingEmail;
  } else if (!Validator.isEmail(parsedData.email)) {
    errors.email = errorMessages.invalidEmail;
  }

  if (Validator.isEmpty(parsedData.password) || Validator.isEmpty(parsedData.confirmPassword)) {
    errors.password = errorMessages.missingPassword;
  } else if (!Validator.isLength(parsedData.password, { min: 8, max: 30 })) {
    errors.password = errorMessages.invalidPassword;
  } else if (!Validator.equals(parsedData.password, parsedData.confirmPassword)) {
    errors.password = errorMessages.nonMatchingPassword;
  }

  return {
    isValid: isEmpty(errors),
    errors,
  };
}

// Ensure username and password are not empty
function validateLoginInput(data) {
  const errors = {};

  const parsedData = {};
  parsedData.username = !isEmpty(data.username) ? data.username : '';
  parsedData.password = !isEmpty(data.password) ? data.password : '';

  if (Validator.isEmpty(parsedData.username)) {
    errors.username = errorMessages.missingUsername;
  }

  if (Validator.isEmpty(parsedData.password)) {
    errors.password = errorMessages.missingPassword;
  }

  return {
    isValid: isEmpty(errors),
    errors,
  };
}

module.exports = {
  validateRegisterInput,
  validateLoginInput,
  errorMessages,
};
