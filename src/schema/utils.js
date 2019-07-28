const { join } = require("path");
const { readFileSync } = require("fs");

module.exports = {
  loadGQLFile,
};

// ###########################################

function loadGQLFile(type) {
  var filePath = join(__dirname, "./", type);
  return readFileSync(filePath, "utf-8");
}
