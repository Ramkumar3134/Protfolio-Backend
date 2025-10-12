const contactRoute = require('./contactRoute');
const express = require('express');
const router = express.Router();

router.use('/contact', contactRoute);

module.exports = router;