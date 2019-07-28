const { GraphQLScalarType } = require("graphql");

const { isValidEmail } = require("../../utils/validator");

var typeDef = `scalar Email`;

function email() {
  return new GraphQLScalarType({
    name: "Email",
    description: "Email custom scalar type",
    serialize(value) {
      // gets invoked when serializing the result to send it back to the client
      return String(value)
        .trim()
        .toLowerCase();
    },
    parseValue(value) {
      // gets invoked to parse client input that was passed through variables
      isValidEmail(value, { error: true });
      return String(value)
        .trim()
        .toLowerCase();
    },
    parseLiteral(ast) {
      // gets invoked to parse client input that was passed inline in the query
      isValidEmail(ast.value, { error: true });
      return String(ast.value)
        .trim()
        .toLowerCase();
    },
  });
}

module.exports = {
  typeDef,
  resolver: { Email: email() },
};
