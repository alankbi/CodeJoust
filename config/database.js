require('dotenv').config();
const mongoose = require('mongoose');

// Connect to database
const dbPath = process.env.DB_CONNECTION;
const options = { useCreateIndex: true, useNewUrlParser: true }; // Fix deprecation warnings
mongoose.connect(dbPath, options).catch((err) => {
  throw err;
});

// Fixes MaxListenersExceededWarning
mongoose.connection.on('close', () => {
  mongoose.connection.removeAllListeners();
});
