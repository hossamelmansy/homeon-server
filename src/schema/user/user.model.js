const bcrypt = require("bcrypt");
const pick = require("lodash/pick");

const { mongoConnector, convertStringToID } = require("../../db/mongo");
const { ERRORS, throwError } = require("../../utils");
const { getTokenFromUser } = require("../../middleware/jwt");

module.exports = {
  user,
  currentUser,
  newUser,
  login,
  getUserById,
};

// ########################################################################

async function user(parent, args) {
  if (args.id) {
    return getUserById(args.id);
  }
  if (args.email) {
    return getUserByEmail(args.email);
  }
  return null;
}

async function currentUser(parent, args, context) {
  return getUserById(context.currentUser._id);
}

async function newUser(parent, args) {
  var db = await mongoConnector.getDb();

  if (await isEmailExist(args.input.email)) {
    throwError(ERRORS.CUSTOM, "Email already exist", "EMAIL_TAKEN");
  }
  var insertedId = await (async function insertUser() {
    var result = await db.collection("users").insertOne({
      ...args.input,
      password: await hashPassword(args.input.password),
      createdAt: new Date(),
    });
    return result.insertedId;
  })();
  var user = getUserById(insertedId);

  return user;
}

async function login(parent, args) {
  var user = await getUserByEmail(args.input.email);

  if (!user) {
    throwError(ERRORS.CUSTOM, "Email not found", "EMAIL_NOT_FOUND");
  }
  if (!(await comparePassword(args.input.password, user.password))) {
    throwError(ERRORS.CUSTOM, "Invalid email or password", "INVALID_LOGIN");
  }

  var token = getTokenFromUser(pick(user, ["_id", "name", "roles"]));
  return { token: token };
}

// ########################################################################

async function isEmailExist(email) {
  var db = await mongoConnector.getDb();
  var count = await db.collection("users").countDocuments({ email: email });
  var isExist = false;
  if (count) {
    isExist = true;
  }
  return isExist;
}

async function getUserById(id) {
  if (typeof id == "string") {
    id = convertStringToID(id);
  }
  var db = await mongoConnector.getDb();
  var cursor = await db
    .collection("users")
    .find({ _id: id })
    .limit(1);
  var user = await cursor.next();
  await cursor.close();
  return user;
}

async function getUserByEmail(email) {
  var db = await mongoConnector.getDb();
  var cursor = await db
    .collection("users")
    .find({ email: email })
    .limit(1);
  var user = await cursor.next();
  await cursor.close();
  return user;
}

async function hashPassword(password) {
  var hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

async function comparePassword(password, hashedPassword) {
  var result = await bcrypt.compare(password, hashedPassword);
  return result;
}
