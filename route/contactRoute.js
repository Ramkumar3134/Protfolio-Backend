const express = require('express');
const {createContect} = require('../controller/contactController')
const router = express.Router();

router.post('/createContact', createContect)

module.exports = router;