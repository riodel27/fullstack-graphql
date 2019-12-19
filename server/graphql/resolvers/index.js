const administratorResolvers = require('./administrator');

module.exports = {
  Query: {
    ...administratorResolvers.Query,
  },
  Mutation: {
    ...administratorResolvers.Mutation
  }
};