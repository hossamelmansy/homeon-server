const { mongoConnector, convertStringToID } = require("../../db/mongo");

const { ERRORS, throwError } = require("../../utils");

module.exports = {
  todo,
  todos,
  newTodo,
};

// ########################################################################
async function todo(parent, args) {
  return getTodoById(args.id);
}

async function todos(parent, args, context) {
  var db = await mongoConnector.getDb();
  var cursor = await db
    .collection("todos")
    .find({ owner: context.currentUser._id });

  if (args.limit) {
    cursor.limit(args.limit);
  }
  var todos = await cursor.toArray();
  await cursor.close();
  return todos;
}

async function newTodo(parent, args, context) {
  var db = await mongoConnector.getDb();
  var result = await db.collection("todos").insertOne({
    ...args.input,
    owner: convertStringToID(context.currentUser._id),
    createdAt: new Date(),
  });
  var todo = getTodoById(result.insertedId);
  return todo;
}

// ########################################################################
async function getTodoById(id) {
  if (typeof id == "string") {
    id = convertStringToID(id);
  }
  var db = await mongoConnector.getDb();
  var cursor = await db
    .collection("todos")
    .find({ _id: id })
    .limit(1);
  var todo = await cursor.next();
  await cursor.close();
  return todo;
}
