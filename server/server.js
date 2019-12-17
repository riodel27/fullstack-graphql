const {
  ApolloServer,
  ApolloError
} = require('apollo-server');

const logger = require('./util/logger')
const resolvers = require('./graphql/resolvers/index');
const typeDefs = require('./graphql/typeDefs');

const init = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    formatError: (error) => {
      if (error.originalError instanceof ApolloError) {
        logger.error(error)
      }
      return error
    }
  });

  server.listen({
    port: 4000
  });
};

init();