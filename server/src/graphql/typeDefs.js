/* eslint-disable no-tabs */
const {
  gql,
} = require('apollo-server');

module.exports = gql`
  type Administrator {
    id: ID!
    username: String
    email: String!
    password: String!
    createdAt: String
    updatedAt: String
  }
  type Query {
	  administrators: [Administrator]
  }
  type Mutation {
    createAdministrator(name:String, email:String!, password:String!): Administrator
  }
`;
