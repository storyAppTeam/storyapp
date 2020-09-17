const express = require('express');
const {helloStory} = require('../controllers/hello.js');

const userRouter = require('./user/index.js');

const router = express.Router();

router.get('/', helloStory);

router.use('/user', userRouter);

module.export =  router;
