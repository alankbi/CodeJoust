const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

// Example API route
app.get('/api/hello/', async (req, res) => {
  res.json({ text: 'Hello World!' });
});

// React production files
app.use(express.static(path.join(__dirname, 'client/build')));

// viewed at http://localhost:8080
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.listen(port);
