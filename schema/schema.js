const graphql = require('graphql');
const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema
} = graphql;
const CompanyType = new GraphQLObjectType({
  name: 'Company',
  // Create a closure to be executed at a later time because of the UserType dependencies.
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    description: {type: GraphQLString},
    // One to many Relationship.
    // This will resolve to many users.
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
        .then(response => {
          return response.data;
        });
      }
    }
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
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
      type: CompanyType,
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
        .then(response => {
          return response.data;
        });
      }
    }
  })
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
          return response.data;
        })
      }
    },
    company: {
      type: CompanyType,
      args: {
        id: {type: GraphQLString}
      },
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/companies/${args.id}`)
        .then(response => {
          return response.data;
        });
      }
    }
  }
});


// Update/Add Data.
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        age: {type: GraphQLInt },
        companyId: {type: GraphQLString }
      },
      resolve() {
        
      }
    }
  }
});
module.exports = new GraphQLSchema({
  query: RootQuery
});
