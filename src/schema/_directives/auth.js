const { SchemaDirectiveVisitor } = require("apollo-server-express");
const { defaultFieldResolver } = require("graphql");

const { ERRORS, throwError } = require("../../utils/index");

var typeDef = `
  directive @auth(
    requires: UserRole = USER
    allowSelf: Boolean = false
  ) on OBJECT | FIELD_DEFINITION | MUTATION | QUERY | SUBSCRIPTION

  enum UserRole {
    ADMIN
    USER
  }
`;

class AuthDirective extends SchemaDirectiveVisitor {
  visitObject(type) {
    this.ensureFieldsWrapped(type);
    type._requiredAuthRole = this.args.requires;
    type._allowself = this.args.allowSelf;
  }

  visitFieldDefinition(field, details) {
    this.ensureFieldsWrapped(details.objectType);
    field._requiredAuthRole = this.args.requires;
    field._allowself = this.args.allowSelf;
  }

  ensureFieldsWrapped(objectType) {
    // Mark the GraphQLObjectType object to avoid re-wrapping
    if (objectType._authFieldsWrapped) return;
    objectType._authFieldsWrapped = true;

    var fields = objectType.getFields();
    Object.keys(fields).forEach(fieldName => {
      var field = fields[fieldName];
      var { resolve = defaultFieldResolver } = field;

      field.resolve = async (parent, args, context, info) => {
        var requiredRole =
          field._requiredAuthRole || objectType._requiredAuthRole;
        var allowSelf = field._allowself || objectType._allowself;

        if (!requiredRole) {
          return resolve.apply(this, [parent, args, context, info]);
        }

        var { currentUser } = context;
        if (!currentUser) {
          throwError(ERRORS.AUTHENTICATION);
        }

        var userRoles = currentUser.roles.map(role => role.toUpperCase()) || [];
        var hasRole = userRoles.includes(requiredRole);

        if (!hasRole && !allowSelf) {
          throwError(ERRORS.FORBIDDEN);
        }

        var result = await resolve.apply(this, [parent, args, context, info]);
        var isSelf = false;
        if (info.returnType.name == "User" && result._id == currentUser._id) {
          isSelf = true;
        }
        if (info.parentType.name == "User" && parent._id && currentUser._id) {
          isSelf = true;
        }

        if (!hasRole && !isSelf) {
          throwError(ERRORS.FORBIDDEN);
        }

        return result;
      };
    });
  }
}

module.exports = {
  typeDef,
  directive: { auth: AuthDirective },
};
