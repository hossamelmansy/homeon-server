const pick = require("lodash/pick");
const {
  AuthenticationError,
  ForbiddenError,
  ApolloError,
} = require("apollo-server-express");

const ERRORS = {
  AUTHENTICATION: "authentication_error",
  USERINPUT: "user_input_error",
  FORBIDDEN: "forbidden_error",
  CUSTOM: "custom_error",
};

module.exports = {
  formatError,
  ERRORS,
  throwError,
};

// ###########################################

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
    default:
      throw new ApolloError(message, code);
  }
}
