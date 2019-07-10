const fs = require('fs');
const path = require('path');

function loadGQLfile(type) {
  var filePath = path.join(__dirname, '../api', type);
  return fs.readFileSync(filePath, 'utf-8');
}

module.exports = loadGQLfile;
