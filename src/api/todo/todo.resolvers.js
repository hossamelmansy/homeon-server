const { isValidId } = require("../../utils/validator");

module.exports = {
  Query: {
    todo,
    todos
  },
  Mutation: {
    newTodo
  }
};

// ########################################################################

function todo(_, args, ctx) {
  var { id } = args;
  var {
    models: { todo: Todo }
  } = ctx;

  isValidId(id, { error: true });

  return Todo.findById(id).exec();
}

function todos(_, args, ctx) {
  var {
    models: { todo: Todo }
  } = ctx;

  return Todo.find({}).exec();
}

async function newTodo(_, args, ctx) {
  var {
    models: { todo: Todo }
  } = ctx;

  return Todo.create({ ...args.input, dueDate: new Date(args.input.dueDate) });
}
