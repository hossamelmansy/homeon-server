const { mongoConnector, convertStringToID } = require("../../db/mongo");

module.exports = {
  lists,
  newList,
  removeList,
  renameList,
  getListById,
};

// ########################################################################
async function lists(parent, args, context) {
  var db = await mongoConnector.getDb();
  var cursor = await db
    .collection("lists")
    .find({ owner: convertStringToID(context.currentUser._id) });

  if (args.limit) {
    cursor.limit(args.limit);
  }

  var lists = await cursor.toArray();
  await cursor.close();
  return lists;
}

async function newList(parent, args, context) {
  var db = await mongoConnector.getDb();
  var result = await db.collection("lists").insertOne({
    ...args.input,
    owner: convertStringToID(context.currentUser._id),
    createdAt: new Date(),
  });
  var list = getListById(result.insertedId);
  return list;
}

async function removeList(parent, args) {
  var db = await mongoConnector.getDb();
  await db.collection("lists").deleteOne({
    _id: args.input,
  });

  return args.input;
}

async function renameList(parent, args) {
  var db = await mongoConnector.getDb();
  await db
    .collection("lists")
    .updateOne({ _id: args.input.id }, { $set: { name: args.input.name } });

  return getListById(args.input.id);
}

// ########################################################################
async function getListById(id) {
  if (typeof id == "string") {
    id = convertStringToID(id);
  }
  var db = await mongoConnector.getDb();
  var cursor = await db
    .collection("lists")
    .find({ _id: id })
    .limit(1);
  var list = await cursor.next();
  await cursor.close();
  return list;
}
