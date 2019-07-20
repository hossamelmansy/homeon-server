module.exports = {
  resolvers: require("./list.resolvers"),
  typeDefs: require("../../utils").loadGQLfile("list/list.graphql"),
  model: require("./list.model")
};
