const express = require('express');
const path = require('path');

require('dotenv').config();

const bodyParser = require('body-parser');
const submitRoute = require('./routes/submitRoute');
const authRoute= require('./routes/authRoute');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

app.listen(port);
