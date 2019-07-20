module.exports = {
  resolvers: require("./todo.resolvers"),
  typeDefs: require("../../utils").loadGQLfile("todo/todo.graphql"),
  model: require("./todo.model")
};
