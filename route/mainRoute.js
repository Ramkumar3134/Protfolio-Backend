const contact = require('./contactRoute')
const express = require('express');
const app = express();

app.use('/contact', contact)

module.exports = app;