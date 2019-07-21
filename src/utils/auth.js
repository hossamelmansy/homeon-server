const jwt = require("jsonwebtoken");

module.exports = {
  signToken,
  verifyToken
};

// #####################################################

function signToken(payload = {}) {
  try {
    var token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      issuer: "Homeon",
      algorithm: "HS256",
      expiresIn: "1h"
    });

    return token;
  } catch (err) {
    return null;
  }
}

function verifyToken(token = "") {
  token = token.replace("Bearer ", "");

  try {
    var payload = jwt.verify(token, process.env.JWT_SECRET_KEY, {
      issuer: "Homeon",
      algorithms: ["HS256"]
    });

    if (!payload) {
      return null;
    }

    return payload;
  } catch (err) {
    return null;
  }
}
