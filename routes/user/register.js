const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();

const validator = require("../../middlewares/validator.js");
const { check } = require("express-validator");

const registerController = require("../../controllers/user/register.js");

//password must contain small and big letter, digit and special character. available characters: ! @ # $ % ^ & * ( )
const regexpPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[\!\@\#\$\%\^\&\*\(\)])(?=.*[A-Z])(?!.*\s).{8,}$/g;

router.post(
  "/",
  bodyParser.json(),
  [
    check("email").isEmail(),
    check("nickname").isString(),
    check("password")
      .isString()
      .isLength({ min: 8, max: 36 })
      .matches(regexpPassword)
      .withMessage(
        "Password must contain minimum 8 characters, small and big letter, digit and special character. Available characters: ! @ # $ % ^ & * ( )"
      ),
  ],
  validator(),
  registerController.register
);

module.exports = router;
