const express = require('express');
const {helloStory} = require('../controllers/hello.js');

const userRouter = require('./user/index.js');
const authrequireRouter = require('./authrequire/index');

const router = express.Router();

router.get('/', helloStory);

router.use('/user', userRouter);
router.use('/authrequire', 
(req, res, next) => (req.isAuthenticated()) ? next() : res.send('failed to auth'),
authrequireRouter);

module.exports =  router;
