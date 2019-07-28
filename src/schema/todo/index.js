module.exports = {
  resolver: require("./todo.resolver"),
  typeDef: require("../utils").loadGQLFile("todo/todo.graphql"),
};
