/* eslint-disable no-tabs */
const { gql } = require('apollo-server');

module.exports = gql`
  input AdministratorInput {
    name: String
    email: String!
    password: String!
  }
  type Administrator {
    id: ID!
    name: String
    email: String!
    password: String!
    createdAt: String
    updatedAt: String
  }
  type Query {
	  administrators: [Administrator]
  }
  type Mutation {
    createAdministrator(administratorInput:AdministratorInput): String
  }
`;
