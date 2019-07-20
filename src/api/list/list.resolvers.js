const { UserInputError } = require("apollo-server");

module.exports = {
  Query: {
    lists
  },
  Mutation: {
    newList
  }
};

// #################################

function lists(_, args, ctx) {
  var {
    models: { list: List }
  } = ctx;

  return List.find({}).exec();
}

function newList(_, args, ctx) {
  var {
    models: { list: List }
  } = ctx;

  return List.create(args.input);
}
