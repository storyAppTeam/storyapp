const express = require('express');
const router = express.Router();

const exampleRouter = require('./example.js');

router.use('/example', exampleRouter);

module.exports = router;