module.exports = {
  resolvers: require("./customTypes.resolvers"),
  typeDefs: require("../../utils").loadGQLfile(
    "customTypes/customTypes.graphql"
  )
};
