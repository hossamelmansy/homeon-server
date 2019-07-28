module.exports = {
  resolver: require("./user.resolver"),
  typeDef: require("../utils").loadGQLFile("user/user.graphql"),
};
