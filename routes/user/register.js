const express = require('express');
const router = express.Router();

const registerController = require('../../controllers/user/register.js');

router.post('/', registerController.register)

module.export =  router;