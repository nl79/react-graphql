const graphql = require('graphql');
const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema
} = graphql;
const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: {
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    description: {type: GraphQLString}
  }
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {
      type: GraphQLString
    },
    firstName: {
      type: GraphQLString
    } ,
    age: {
      type: GraphQLInt
    },
    company: {
      type: CompanyType

    }
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,

      // These args are the required parameters that will need to be passed
      // to the query. Ex: user(id: '23'). Then will then be passed into the
      // resolve function.
      args: {
        id: {
          type: GraphQLString
        }
      },
      // The resolve function is the function that actually fetches the data
      // from the datastore.
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/users/${args.id}`).then(response => {
          console.log('response', response);
          return response.data;
        })
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
