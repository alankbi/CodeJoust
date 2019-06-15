const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validate = require('../validation/validate');

const User = mongoose.model('User');

const router = express.Router();

// @route POST /api/auth/register/
router.post('/register', (req, res) => {
  const { isValid, errors } = validate.validateRegisterInput(req.body);
  if (!isValid) {
    res.status(400).json(errors);
    return;
  }

  User.find({
    $or: [{ email: req.body.email },
      { username: req.body.username }],
  }).then((user, err) => {
    if (err && err.length > 0) {
      res.status(400).json(err);
      return;
    }

    // Check if username or email already exists
    if (user && user.length !== 0) {
      const errs = {};
      if (user[0].username === req.body.username) {
        errs.username = validate.errorMessages.existingUsername;
      }
      if (user[0].email === req.body.email) {
        errs.email = validate.errorMessages.existingEmail;
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
  }).catch((err) => {
    res.status(400).json(err);
  });
});

// @route POST /api/auth/login/
router.post('/login', (req, res) => {
  const { isValid, errors } = validate.validateLoginInput(req.body);
  if (!isValid) {
    res.status(400).json(errors);
    return;
  }

  User.findOne({ username: req.body.username }).then((user) => {
    if (!user) {
      res.status(404).json({ username: validate.errorMessages.nonexistentUsername });
      return;
    }

    // Check password is correct
    bcrypt.compare(req.body.password, user.password).then((match) => {
      if (match) {
        // Create JWT payload
        const payload = {
          id: user.id,
          username: user.username,
          email: user.email,
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
        res.status(400).json({ password: validate.errorMessages.wrongPassword });
      }
    }).catch((err) => {
      res.status(400).json(err);
    });
  }).catch((err) => {
    res.status(400).json(err);
  });
});

module.exports = router;
