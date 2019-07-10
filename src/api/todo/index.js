module.exports = {
  resolvers: require('./todo.resolvers'),
  typeDefs: require('../../utils/gqlLoader')('todo/todo.graphql'),
  model: require('./todo.model')
};
