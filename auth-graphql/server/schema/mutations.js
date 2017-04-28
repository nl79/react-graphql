const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString
} = graphql;

const AuthService = require('../services/auth');

const UserType = require('./types/user_type');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    singup : {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, {email, password}, req) {
        return AuthService.signup({email, password, req})
      }
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        // Save a reference to the user property.
        const { user } = req;
        req.logout();
        return user;
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString},
        password: { type: GraphQLString}
      },
      resolve(parentValue, { email, password }, req) {
        return AuthService.login({email, password, req});
      }
    }
  }
});

module.exports = mutation;