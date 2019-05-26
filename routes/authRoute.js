const express = require('express');
const Validator = require('validator');
const isEmpty = require('is-empty');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const router = express.Router();

const errorMessages = {
  missingUsername: 'Please enter a username',
  missingEmail: 'Please enter an email',
  invalidEmail: 'Please enter a valid email',
  missingPassword: 'Please enter a password',
  invalidPassword: 'Password must be between 8 and 30 characters',
  nonMatchingPassword: 'Passwords must match',
};

function validateRegisterInput(data) {
  const errors = {};

  const parsedData = {};
  parsedData.username = !isEmpty(data.name) ? data.name : '';
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

  if (Validator.isEmpty(data.password) || Validator.isEmpty(data.confirmPassword)) {
    errors.password = errorMessages.missingPassword;
  }

  if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = errorMessages.invalidPassword;
  }

  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.password = errorMessages.nonMatchingPassword;
  }

  return {
    isValid: isEmpty(errors),
    errors,
  };
}

function validateLoginInput(data) {
  const errors = {};

  const parsedData = {};
  parsedData.username = !isEmpty(data.name) ? data.name : '';
  parsedData.password = !isEmpty(data.password) ? data.password : '';

  if (Validator.isEmpty(parsedData.username)) {
    errors.username = errorMessages.missingUsername;
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = errorMessages.missingPassword;
  }

  return {
    isValid: isEmpty(errors),
    errors,
  };
}

router.post('/register', (req, res) => {
  const { isValid, errors } = validateRegisterInput(req.body);
  if (!isValid) {
    res.status(400).json(errors);
  } else {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    // TODO: hash password
  }
});

router.post('/login', (req, res) => {

});

module.exports = router;
