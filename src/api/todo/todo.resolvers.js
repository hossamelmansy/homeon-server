function todo(_, args, ctx) {
  var { id } = args;

  if (!id) {
    throw new Error('Invalid input');
  }

  return ctx.models.todo.findById(id);
}

function todos(_, args, ctx) {
  return ctx.models.todo.find({});
}

function newTodo(_, args, ctx) {
  return ctx.models.todo.create(args.input);
}

var todoResolvers = {
  id(todo) {
    return String(todo._id);
  }
};

module.exports = {
  Query: {
    todo,
    todos
  },
  Mutation: {
    newTodo
  },
  Todo: {
    ...todoResolvers
  }
};
