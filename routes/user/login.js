const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();

const validator = require("../../middlewares/validator.js");
const { check } = require("express-validator");

const loginController = require("../../controllers/user/login.js");

router.post(
  "/",
  bodyParser.json(),
  [
    check("email").isString().isEmail(),
    check("password").isString().isLength({ min: 8, max: 36 }),
  ],
  validator(),
  loginController.login
);

module.exports = router;
