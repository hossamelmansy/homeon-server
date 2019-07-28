const { makeExecutableSchema, gql } = require("apollo-server-express");
const merge = require("lodash/merge");

const directives = require("./_directives");
const scalars = require("./_scalars");
const user = require("./user");
const list = require("./list");
const todo = require("./todo");

/**
 * Create a base typeDef so other typeDefs can extend them later
 * Types cannot be empty, so we'll define something in each type
 */
var baseTypeDefs = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

var typeDefs = [
  baseTypeDefs,
  ...scalars.typeDefs,
  ...directives.typeDefs,
  user.typeDef,
  list.typeDef,
  todo.typeDef,
];
var resolvers = merge(
  scalars.resolvers,
  user.resolver,
  list.resolver,
  todo.resolver,
);
var schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives: directives.schemaDirectives,
});

module.exports = schema;
