const express = require('express');
const mongoose = require('mongoose');
const Validator = require('validator');
const isEmpty = require('is-empty');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');

const router = express.Router();

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
  }

  if (!Validator.isLength(parsedData.password, { min: 8, max: 30 })) {
    errors.password = errorMessages.invalidPassword;
  }

  if (!Validator.equals(parsedData.password, parsedData.confirmPassword)) {
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

// @route POST /api/auth/register/
router.post('/register', (req, res) => {
  const { isValid, errors } = validateRegisterInput(req.body);
  if (!isValid) {
    res.status(400).json(errors);
    return;
  }

  User.find({
    $or: [{ email: req.body.email },
      { username: req.body.username }],
  }).then((err, user) => {
    if (err && err.length > 0) {
      res.status(400).json(err);
      return;
    }

    // Check if username or email already exists
    if (user && user.length !== 0) {
      const errs = {};
      if (user[0].username === req.body.username) {
        errs.username = errorMessages.existingUsername;
      }
      if (user[0].email === req.body.email) {
        errs.email = errorMessages.existingEmail;
      }
      res.status(400).json(errs);
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });

      // Hash password before storing in database
      const saltRounds = 10; // Calculations done ~2^10 times, slows down brute force hacking
      bcrypt.hash(newUser.password, saltRounds, (error, hash) => {
        if (error) {
          res.status(400).json(error);
          return;
        }
        newUser.password = hash;
        newUser.save().then((userInfo) => {
          res.json(userInfo);
        }).catch((saveError) => {
          res.status(400).json(saveError);
        });
      });
    }
  });
});

// @route POST /api/auth/login/
router.post('/login', (req, res) => {
  const { isValid, errors } = validateLoginInput(req.body);
  if (!isValid) {
    res.status(400).json(errors);
    return;
  }

  User.findOne({ username: req.body.username }).then((user) => {
    if (!user) {
      res.status(404).json({ username: errorMessages.nonexistentUsername });
      return;
    }

    // Check password is correct
    bcrypt.compare(req.body.password, user.password).then((match) => {
      if (match) {
        // Create JWT payload
        const payload = {
          id: user.id,
          username: user.username,
        };

        // Sign token
        const options = { expiresIn: '30d' };
        jwt.sign(payload, process.env.SECRET_OR_KEY, options, (err, token) => {
          if (err) {
            res.status(400).json(err);
          } else {
            res.json({ success: true, token: `Bearer ${token}` });
          }
        });
      } else {
        res.status(400).json({ password: errorMessages.wrongPassword });
      }
    });
  });
});

module.exports = router;
