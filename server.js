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
app.get('/.well-known/acme-challenge/11eWXlp0ahTsFPHpFRh73dpnn2GOtGlAjKTpDcoXLmI', function (req, res) {
  res.send('11eWXlp0ahTsFPHpFRh73dpnn2GOtGlAjKTpDcoXLmI.o8Wi9GTAN0qG_ckoj-thcH8VFvxSyQI5UhvbqAWKVck');
})
app.get('/.well-known/acme-challenge/hlFBUsiFNuKF_UDD6psPkX3_FBAX85swt7Pi2gFw1ho', function (req, res) {
  res.send('hlFBUsiFNuKF_UDD6psPkX3_FBAX85swt7Pi2gFw1ho.o8Wi9GTAN0qG_ckoj-thcH8VFvxSyQI5UhvbqAWKVck');
})

/* static files */
app.use(favicon(path.join(__dirname, '/favicon.ico')));
app.use("/css", express.static(__dirname + '/css'));
// app.use("test", express.static(__dirname + '/.well-known'));

app.listen(port);