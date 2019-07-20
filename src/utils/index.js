const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const pick = require("lodash/pick");

module.exports = {
  loadGQLfile,
  isValidId,
  formatError
};

// #########################

function loadGQLfile(type) {
  var filePath = path.join(__dirname, "../api", type);
  return fs.readFileSync(filePath, "utf-8");
}

function isValidId(id = "") {
  return mongoose.Types.ObjectId.isValid(id);
}

function formatError(err) {
  if (process.env.NODE_ENV == "production") {
    return pick(err, ["message", "extensions"]);
  }

  return err;
}
