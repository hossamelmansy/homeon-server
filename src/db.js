const mongoose = require("mongoose");

module.exports = function connectToDB(url = process.env.DB_URL) {
  return mongoose.connect(url, { useNewUrlParser: true });
};
