const express = require("express");
const router = express.Router();

const exampleController = require("../../controllers/autrequire/example");

router.get("/", exampleController);

module.exports = router;
