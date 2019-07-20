const path = require("path");
const fs = require("fs");
const pick = require("lodash/pick");
const {
  AuthenticationError,
  UserInputError,
  ForbiddenError,
  ApolloError
} = require("apollo-server");

const ERRORS = {
  AUTHENTICATION: "authentication_error",
  USERINPUT: "user_input_error",
  FORBIDDEN: "forbidden_error",
  CUSTOM: "custom_error"
};

module.exports = {
  loadGQLfile,
  formatError,
  ERRORS,
  throwError
};

// ###########################################

function loadGQLfile(type) {
  var filePath = path.join(__dirname, "../api", type);
  return fs.readFileSync(filePath, "utf-8");
}

function formatError(err) {
  if (process.env.NODE_ENV == "production") {
    return pick(err, ["message", "extensions"]);
  }

  return err;
}

function throwError(type = ERRORS.CUSTOM, message = "Error", code = "ERROR") {
  switch (type) {
    case ERRORS.AUTHENTICATION:
      throw new AuthenticationError("Authentication required!");
    case ERRORS.FORBIDDEN:
      throw new ForbiddenError("Forbidden!");
    case ERRORS.USERINPUT:
      throw new UserInputError(message);
    default:
      throw new ApolloError(message, code);
  }
}
