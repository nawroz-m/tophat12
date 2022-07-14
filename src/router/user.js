const express = require("express");

const router = express.Router();
const validator = require("../vlaidator/userValidator");
const VALIDATOR = require("../constant/validator/validator");
const { registerUser, login } = require("../controller/user/user");

const PATH = {
  SIGN_UP: "/signup",
  LOGIN: "/login",
};

/**
 * @api {POST} /signup
 * @desc User SignUp API
 * @access Public
 */
router.post(PATH.SIGN_UP, validator(VALIDATOR.REGISTER_USER), registerUser);

/**
 * @api {POST} /login
 * @desc User Login API
 * @access Public
 */
router.post(PATH.LOGIN, validator(VALIDATOR.LOGIN), login);

module.exports = router;
