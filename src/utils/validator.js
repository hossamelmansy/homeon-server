const mongoose = require("mongoose");
const validator = require("validator");
const { ERRORS, throwError } = require("./index");

module.exports = {
  isValidId,
  isValidEmail,
  isValidPhone,
  isValidPassword,
  isLoggedIn
};

// ####################################

function isValidId(value = "", options = { error: false }) {
  var { error = false } = options;
  var valid = mongoose.Types.ObjectId.isValid(value.trim());

  return error && !valid ? throwError(ERRORS.USERINPUT, "Invalid id") : valid;
}

function isValidEmail(value = "", options = { error: false }) {
  var { error = false } = options;
  var valid = validator.isEmail(value.trim());

  return error && !valid
    ? throwError(ERRORS.USERINPUT, "Invalid email")
    : valid;
}

function isValidPhone(value = "", options = { locale: "ar-EG", error: false }) {
  var { locale = "ar-EG", error = false } = options;
  var valid = validator.isMobilePhone(value.trim(), locale);

  return error && !valid
    ? throwError(ERRORS.USERINPUT, "Invalid phone")
    : valid;
}

function isValidPassword(value = "", options = { error: false }) {
  var { error = false } = options;
  var valid = !validator.isEmpty(value);

  return error && !valid
    ? throwError(ERRORS.USERINPUT, "Invalid password")
    : valid;
}

function isLoggedIn(user = null) {
  if (!user) {
    throwError(ERRORS.AUTHENTICATION);
  }
}
