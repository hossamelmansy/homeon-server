const User = require("./user.model");

module.exports = {
  Query: {
    user: User.user,
    currentUser: User.currentUser,
  },
  Mutation: {
    newUser: User.newUser,
    login: User.login,
  },
  User: {
    id(parent) {
      return parent._id;
    },
  },
};
