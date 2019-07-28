const List = require("./list.model");
const { getUserById } = require("../user/user.model");

module.exports = {
  Query: {
    lists: List.lists,
  },
  Mutation: {
    newList: List.newList,
    removeList: List.removeList,
    renameList: List.renameList,
  },
  List: {
    id(parent) {
      return parent._id;
    },
    owner(parent) {
      return getUserById(parent.owner);
    },
  },
};
