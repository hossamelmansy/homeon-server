const { ObjectID } = require("mongodb");
const validator = require("validator");
const moment = require("moment");

const { ERRORS, throwError } = require("./index");

module.exports = {
  isValidId,
  isValidEmail,
  isValidMobilePhone,
  isValidPassword,
  isValidDateTime,
};

// ####################################

function isValidId(value = "", options = { error: false }) {
  var { error = false } = options;
  var valid = ObjectID.isValid(value.trim());

  return error && !valid
    ? throwError(ERRORS.CUSTOM, "ObjectId failed validation", "INVALID_ID")
    : valid;
}

function isValidEmail(value = "", options = { error: false }) {
  var { error = false } = options;
  var valid = validator.isEmail(value.trim());

  return error && !valid
    ? throwError(
        ERRORS.CUSTOM,
        "Email address failed validation",
        "INVALID_EMAIL",
      )
    : valid;
}

function isValidMobilePhone(
  value = "",
  options = { locale: "ar-EG", error: false },
) {
  var { locale = "ar-EG", error = false } = options;
  var valid = validator.isMobilePhone(value.trim(), locale);

  return error && !valid
    ? throwError(ERRORS.CUSTOM, "Phone failed validation", "INVALID_PHONE")
    : valid;
}

function isValidPassword(value = "", options = { error: false }) {
  var { error = false } = options;
  var valid = !validator.isEmpty(value);

  return error && !valid
    ? throwError(
        ERRORS.CUSTOM,
        "Password failed validation",
        "INVALID_PASSWORD",
      )
    : valid;
}

function isValidDateTime(value = "", options = { error: false }) {
  var { error = false } = options;
  var valid = moment(value).isValid();

  return error && !valid
    ? throwError(
        ERRORS.CUSTOM,
        "DateTime failed validation",
        "INVALID_DATETIME",
      )
    : valid;
}
