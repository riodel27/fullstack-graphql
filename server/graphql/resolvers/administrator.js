const {
  ApolloError,
  AuthenticationError
} = require('apollo-server')

module.exports = {
  Query: {
    async administrators() {
      throw new ApolloError('error simulation', 400, {
        query: {
          test: 'test'
        }
      })
      return [];
    },
  },
};