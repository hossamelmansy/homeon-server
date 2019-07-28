const { GraphQLScalarType } = require("graphql");
const { ObjectID } = require("mongodb");

const { isValidId } = require("../../utils/validator");

var typeDef = `scalar ObjectId`;

function objectId() {
  return new GraphQLScalarType({
    name: "ObjectId",
    description: "ObjectId custom scalar type",
    serialize(value) {
      // gets invoked when serializing the result to send it back to the client
      return String(value).trim();
    },
    parseValue(value) {
      // gets invoked to parse client input that was passed through variables
      isValidId(value, { error: true });
      return new ObjectID(value);
    },
    parseLiteral(ast) {
      // gets invoked to parse client input that was passed inline in the query
      isValidId(ast.value, { error: true });
      return new ObjectID(ast.value);
    },
  });
}

module.exports = {
  typeDef,
  resolver: { ObjectId: objectId() },
};
