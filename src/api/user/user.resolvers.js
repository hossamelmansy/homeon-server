const {
  isValidId,
  isValidEmail,
  isValidPhone,
  isValidPassword
} = require("../../utils/validator");
const { throwError, ERRORS } = require("../../utils");

module.exports = {
  Query: {
    user
  },
  Mutation: {
    newUser
  }
};

// ########################################################################

function user(_, args, ctx) {
  var { id } = args;
  var {
    models: { user: User }
  } = ctx;

  isValidId(id, { error: true });

  return User.findById(id).exec();
}

async function newUser(_, args, ctx) {
  var {
    models: { user: User }
  } = ctx;
  var {
    input: { email, phone, password }
  } = args;

  isValidEmail(email, { error: true });
  isValidPassword(password, { error: true });
  phone && isValidPhone(phone, { error: true });
  if (await User.isEmailExist(email)) {
    throwError(ERRORS.CUSTOM, "This email registered before");
  }

  return User.create(args.input);
}
