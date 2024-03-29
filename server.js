require('dotenv').config();
const express = require('express');
const path = require('path');
const passport = require('passport');
const bodyParser = require('body-parser');
const fs = require('fs');
require('./config/database');

// Register all database models
const modelsPath = path.join(__dirname, 'models');
fs.readdirSync(modelsPath).forEach((file) => {
  if (file.indexOf('.js') >= 0) {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    require(path.join(modelsPath, file));
  }
});

const { passportConfiguration } = require('./config/passport');
const submitRoute = require('./routes/submitRoute');
const authRoute = require('./routes/authRoute');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
passportConfiguration(passport);

// Example API route
app.get('/api/hello/', async (req, res) => {
  res.json({ text: 'Hello World!' });
});

// Load in API routes for submitting
app.use('/api/submit/', submitRoute);

// API route for login and register
app.use('/api/auth/', authRoute);

// React production files
app.use(express.static(path.join(__dirname, 'client/build')));

// viewed at http://localhost:8080
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.server = app.listen(port);

module.exports = app;
