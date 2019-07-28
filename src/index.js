const http = require("http");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const env = require("./env");
const schema = require("./schema");
const context = require("./context");
const { mongoConnector } = require("./db/mongo");
const { authMiddleware, authErrorHandler } = require("./middleware/jwt");

const app = express();
app.use(authMiddleware, authErrorHandler);
const server = new ApolloServer({
  schema,
  context,
  formatError: require("./utils").formatError,
  tracing: process.env.NODE_ENV == "production" ? false : true,
  debug: process.env.NODE_ENV == "production" ? false : true,
});

server.applyMiddleware({ app });
var httpServer = http.createServer(app);

httpServer.listen({ port: env.GRAPHQL_SERVER_PORT }, function() {
  console.log(
    `🚀 Server ready at http://localhost:${env.GRAPHQL_SERVER_PORT}${server.graphqlPath}`,
  );
});

async function gracefulShutdown() {
  console.log("Stopping HTTP Server");
  httpServer.close(async function() {
    // Close any other open connections (i.e. database)
    await mongoConnector.closeConnection();
    console.log("All connections closed");
  });
}

process.on("SIGTERM", gracefulShutdown);
