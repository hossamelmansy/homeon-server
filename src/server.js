const { ApolloServer } = require('apollo-server');

const gqlServerConfig = require('./api');

require('./db')();

const server = new ApolloServer({
  ...gqlServerConfig,
  tracing: true,
  debug: true
});

server.listen().then(function({ url }) {
  console.log(`🚀 Server ready at ${url}`);
});
