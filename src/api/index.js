const merge = require('lodash/merge');

const todo = require('./todo');

module.exports = {
  typeDefs: [todo.typeDefs].join(' '),
  resolvers: merge({}, todo.resolvers),
  context: {
    models: {
      todo: todo.model
    }
  }
};
