require("dotenv").config();

var environmentVariables = {
  GRAPHQL_SERVER_PORT: process.env.GRAPHQL_SERVER_PORT || null,
  MONGO_URL: process.env.MONGO_URL,
  MONGO_DATABASE: process.env.MONGO_DATABASE,
  MONGO_USER: process.env.MONGO_USER || "",
  MONGO_PASSWORD: process.env.MONGO_PASSWORD || "",
  MONGO_CONNECTION_POOL_SIZE: process.env.MONGO_CONNECTION_POOL_SIZE
    ? parseInt(process.env.MONGO_CONNECTION_POOL_SIZE, 10)
    : 10,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
};

// Check that all required environment variables have been set and exit server if any are not defined.
var missingEnvs = Object.keys(environmentVariables).filter(function(key) {
  return environmentVariables[key] == null;
});
var isMissingEnv = missingEnvs.length > 0;

if (isMissingEnv) {
  console.error("The following required environemtn variables ars missing");
  console.error(missingEnvs.join("\n"), "\n");
  throw new Error("Environment variables are missing.");
}

module.exports = environmentVariables;
