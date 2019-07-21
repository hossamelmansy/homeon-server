const {
  isValidId,
  isValidEmail,
  isValidPhone,
  isValidPassword,
  isLoggedIn
} = require("../../utils/validator");
const { throwError, ERRORS } = require("../../utils");
const { signToken } = require("../../utils/auth");

module.exports = {
  Query: {
    user
  },
  Mutation: {
    newUser,
    login
  }
};

// ########################################################################

function user(_, args, ctx) {
  isLoggedIn(ctx.user);

  var { id } = args;
  var {
    models: { user: User }
  } = ctx;

  isValidId(id, { error: true });

  return User.findById(id)
    .exec()
    .lean();
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
    throwError(ERRORS.CUSTOM, "Email taken");
  }

  return User.create(args.input);
}

async function login(_, args, ctx) {
  var {
    input: { email, password }
  } = args;
  var {
    models: { user: User }
  } = ctx;

  isValidEmail(email, { error: true });
  isValidPassword(password, { error: true });
  if (!(await User.isEmailExist(email))) {
    throwError(ERRORS.CUSTOM, "Email not exist");
  }

  var user = await User.findOne({ email }).exec();
  if (!(await user.comparePassword(password))) {
    throwError(ERRORS.CUSTOM, "Invalid password");
  }
  var token = signToken({
    sub: user.id,
    name: user.name,
    email: user.email
  });

  return token;
}

// ########################################################################
