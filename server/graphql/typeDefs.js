/* eslint-disable no-tabs */
const { gql } = require('apollo-server');

module.exports = gql`
  type Administrator {
    id: ID!
    namne: String!
    password: String!
    createdAt: String!
    updatedAt: String!
  }
  type Query {
	  administrators: [Administrator]
  }
`;
