const merge = require("lodash/merge");

const dateTime = require("./dateTime");
const auth = require("./auth");

var typeDefs = [dateTime.typeDef, auth.typeDef];

var schemaDirectives = merge(dateTime.directive, auth.directive);

module.exports = {
  typeDefs,
  schemaDirectives,
};
