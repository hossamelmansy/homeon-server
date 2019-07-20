module.exports = {
  resolvers: require("./user.resolvers"),
  typeDefs: require("../../utils").loadGQLfile("user/user.graphql"),
  model: require("./user.model")
};
