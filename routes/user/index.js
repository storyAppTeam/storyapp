const express = require('express');
const router = express.Router();

const registerRouter = require('./register.js');
const loginRouter = require('./login.js');
const logoutRouter = require('./logout.js');

router.use('/register', registerRouter);
router.use('/login', loginRouter);
router.use('/logout', logoutRouter);

module.export = router;