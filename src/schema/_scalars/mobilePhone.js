const { GraphQLScalarType } = require("graphql");

const { isValidMobilePhone } = require("../../utils/validator");

var typeDef = `scalar MobilePhone`;

function mobilePhone() {
  return new GraphQLScalarType({
    name: "MobilePhone",
    description: "MobilePhone custom scalar type",
    serialize(value) {
      // gets invoked when serializing the result to send it back to the client
      return String(value).trim();
    },
    parseValue(value) {
      // gets invoked to parse client input that was passed through variables
      isValidMobilePhone(value, { error: true });
      return String(value).trim();
    },
    parseLiteral(ast) {
      // gets invoked to parse client input that was passed inline in the query
      isValidMobilePhone(ast.value, { error: true });
      return String(ast.value).trim();
    },
  });
}

module.exports = {
  typeDef,
  resolver: { MobilePhone: mobilePhone() },
};
