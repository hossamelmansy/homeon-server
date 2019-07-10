const mongoose = require('mongoose');

module.exports = function connectToDB(url = 'mongodb://localhost/homeon') {
  return mongoose.connect(url, { useNewUrlParser: true });
};
