const jwt = require("jsonwebtoken");
const JsonWebTokenError = jwt.JsonWebTokenError;

const env = require("../env");

module.exports = {
  authMiddleware,
  authErrorHandler,
  getUserFromToken,
  getTokenFromUser,
};

// ############################################################

function getTokenFromHttpRequest(req) {
  var authHeader = req.headers.authorization;
  if (!authHeader) {
    return null;
  }
  var [type, credentials] = authHeader.split(" ");
  if (type !== "Bearer") {
    throw new JsonWebTokenError("INVALID_TOKEN", {
      message: "Unsupported Authentication Type",
    });
  }
  return credentials;
}

async function getUserFromToken(token) {
  var user = jwt.verify(token, env.JWT_SECRET_KEY, {
    algorithm: "HS256", // Very important when using key pairs!
  });
  return user;
}

async function getTokenFromUser(user) {
  var token = jwt.sign(user, env.JWT_SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: "1h",
  });
  return token;
}

async function authMiddleware(req, res, next) {
  try {
    var token = getTokenFromHttpRequest(req);
    if (!token) {
      next();
      return;
    }
    var user = await getUserFromToken(token);
    if (user) {
      req.currentUser = user; // eslint-disable-line
    }
    next();
    return;
  } catch (e) {
    next(e);
  }
}

function authErrorHandler(err, req, res, next) {
  if (err instanceof JsonWebTokenError) {
    res.json({
      errors: [
        {
          message: "Authentication required!",
          extensions: {
            code: "UNAUTHENTICATED",
          },
        },
      ],
    });
  } else {
    next(err);
  }
}
