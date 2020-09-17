const Router = require("express");
const router = Router();


const { createRequire } = require('module');

const require = createRequire(import.meta.url);

router.use('/register', require('./register.js'));

module.export =  router;