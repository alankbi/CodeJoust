var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');

var app = express();
const port = process.env.PORT || 8080;

// viewed at http://localhost:8080
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

// Add this for Let's Encrypt ACME challenge validation
app.get('/.well-known/acme-challenge/:str', function (req, res) {
  // res.send(process.env.LETS_ENCRYPT_CHALLENGE.toString());
  res.send(new Buffer(process.env.LETS_ENCRYPT_CHALLENGE).toString('ascii'));
})

/* static files */
app.use(favicon(path.join(__dirname, '/favicon.ico')));
app.use("/css", express.static(__dirname + '/css'));

app.listen(port);