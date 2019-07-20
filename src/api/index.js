const merge = require("lodash/merge");

const customTypes = require("./customTypes");
const todo = require("./todo");
const user = require("./user");
const list = require("./list");

module.exports = {
  typeDefs: [
    customTypes.typeDefs,
    todo.typeDefs,
    user.typeDefs,
    list.typeDefs
  ].join(" "),
  resolvers: merge(
    {},
    customTypes.resolvers,
    todo.resolvers,
    user.resolvers,
    list.resolvers
  ),
  context: {
    models: {
      todo: todo.model,
      user: user.model,
      list: list.model
    }
  }
};
