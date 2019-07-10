require('dotenv').config();
const { ApolloServer } = require('apollo-server');

const gqlServerConfig = require('./api');
require('./db')();

const server = new ApolloServer({
  ...gqlServerConfig,
  formatError: require('./utils').formatError,
  tracing: process.env.NODE_ENV == 'production' ? false : true,
  debug: process.env.NODE_ENV == 'production' ? false : true
});

server.listen().then(function({ url }) {
  console.log(`🚀 Server ready at ${url}`);
});
