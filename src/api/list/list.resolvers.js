const { isLoggedIn, isValidId } = require("../../utils/validator");
const { ERRORS, throwError } = require("../../utils");

module.exports = {
  Query: {
    lists
  },
  Mutation: {
    newList,
    removeList,
    renameList
  },
  List: {
    async owner(list, args, ctx) {
      return await ctx.models.user.findById(ctx.user.id).exec();
    }
  }
};

// ######################################################

function lists(_, args, ctx) {
  isLoggedIn(ctx.user);

  var {
    user,
    models: { list: List }
  } = ctx;

  return List.find({ owner: user.id })
    .sort({ createdAt: "asc" })
    .exec();
}

function newList(_, args, ctx) {
  isLoggedIn(ctx.user);

  var {
    user,
    models: { list: List }
  } = ctx;

  return List.create({ ...args.input, owner: user.id });
}

async function removeList(_, args, ctx) {
  isLoggedIn(ctx.user);
  isValidId(args.input);

  var list = await ctx.models.list
    .findOneAndRemove({ _id: args.input, owner: ctx.user.id })
    .exec();

  if (!list) {
    throwError(ERRORS.CUSTOM, "List not exist");
  }

  return list;
}

async function renameList(_, args, ctx) {
  isLoggedIn(ctx.user);
  isValidId(args.input.id);
  var { id, name } = args.input;

  var list = await ctx.models.list
    .findOneAndUpdate(
      {
        _id: id,
        owner: ctx.user.id
      },
      { name },
      { new: true }
    )
    .exec();

  return list;
}
