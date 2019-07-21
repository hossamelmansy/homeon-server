require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const merge = require("lodash/merge");

const { typeDefs, resolvers, context } = require("./api");
const { verifyToken } = require("./utils/auth");
const { model: User } = require("./api/user");
require("./db")();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async function({ req }) {
    var token = req.headers.authorization || "";
    var payload = verifyToken(token);
    var user = await User.findById(payload.sub).exec();

    return merge({ user }, context);
  },
  formatError: require("./utils").formatError,
  tracing: process.env.NODE_ENV == "production" ? false : true,
  debug: process.env.NODE_ENV == "production" ? false : true
});

server.listen().then(function({ url }) {
  console.log(`🚀 Server ready at ${url}`);
});
