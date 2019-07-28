module.exports = {
  resolver: require("./list.resolver"),
  typeDef: require("../utils").loadGQLFile("list/list.graphql"),
};
