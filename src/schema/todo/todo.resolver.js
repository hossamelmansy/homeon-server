const Todo = require("./todo.model");
const { getUserById } = require("../user/user.model");
const { getListById } = require("../list/list.model");

module.exports = {
  Query: {
    todo: Todo.todo,
    todos: Todo.todos,
  },
  Mutation: {
    newTodo: Todo.newTodo,
  },
  Todo: {
    id(parent) {
      return parent._id;
    },
    owner(parent) {
      return getUserById(parent.owner);
    },
    list(parent) {
      return getListById(parent.list);
    },
  },
};
