const { SchemaDirectiveVisitor } = require("apollo-server-express");
const { defaultFieldResolver, GraphQLString } = require("graphql");
const moment = require("moment");

var typeDef = `
  directive @dateTime(format: String = "dddd, MMM DD, YYYY") on FIELD_DEFINITION
`;

class DateTimeDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    var { resolve = defaultFieldResolver } = field;
    var { format: defaultFormat } = this.args;
    field.args.push({
      name: "format",
      type: GraphQLString,
      description: "format string",
    });

    field.resolve = async (parent, { format, ...otherArgs }, context, info) => {
      var date = await resolve.apply(this, parent, otherArgs, context, info);

      return format
        ? moment(date).format(format)
        : moment(date).format(defaultFormat);
    };
  }
}

module.exports = {
  typeDef,
  directive: { dateTime: DateTimeDirective },
};
