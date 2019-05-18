const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

// viewed at http://localhost:8080
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

/* static files */
app.use(express.static(path.join(__dirname, '/client')));

app.listen(port);
