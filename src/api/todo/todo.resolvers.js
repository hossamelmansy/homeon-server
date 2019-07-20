const { UserInputError } = require("apollo-server");

const { isValidId } = require("../../utils");

module.exports = {
  Query: {
    todo,
    todos
  },
  Mutation: {
    newTodo
  },
  Todo: {
    id(todo) {
      return String(todo._id);
    }
  }
};

// #################################

function todo(_, args, ctx) {
  var { id } = args;
  var {
    models: { todo: Todo }
  } = ctx;

  if (!isValidId(id)) {
    throw new UserInputError("Invalid Form Arguments", {
      invalidArgs: Object.keys(args)
    });
  }

  return Todo.findById(id).exec();
}

function todos(_, args, ctx) {
  return ctx.models.todo.find({}).exec();
}

function newTodo(_, args, ctx) {
  return ctx.models.todo.create(args.input);
}
