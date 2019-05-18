const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');

const app = express();
const port = process.env.PORT || 8080;

// viewed at http://localhost:8080
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

/* static files */
app.use(favicon(path.join(__dirname, '/favicon.ico')));
app.use(express.static(path.join(__dirname, '/css')));

app.listen(port);
