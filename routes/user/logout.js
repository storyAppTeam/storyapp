const express = require('express');
const router = express.Router();

const logoutController = require('../../controllers/user/logout.js');

router.post('/', logoutController.logout)

module.exports =  router;