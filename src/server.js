const { ApolloServer, gql } = require('apollo-server');

require('./db')();

// The GraphQL schema
const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`;

// A map of functions which return data for the schema
const resolvers = {
  Query: {
    hello: function() {
      return 'World!';
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  tracing: true,
  debug: true
});

server.listen().then(function({ url }) {
  console.log(`🚀 Server ready at ${url}`);
});
