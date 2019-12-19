const {
  ApolloServer,
  ApolloError,
} = require('apollo-server');

const { db } = require('./db');
const logger = require('./util/logger');
const resolvers = require('./graphql/resolvers/index');
const typeDefs = require('./graphql/typeDefs');

const init = async () => {
  await db();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    introspection: true,
    context: ({ req }) => {
      // TODO. log request query or mutation
      // graphiql has a background request like the instropection.
      // console.log('request body: ', req.body)

    },
    formatError: (error) => {
      if (error.originalError instanceof ApolloError) {
        logger.error(error);
      }
      return error;
    },
  });

  server.listen({
    port: 4000,
  });
};

init();
