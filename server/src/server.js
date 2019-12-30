const {
  ApolloServer,
  ApolloError,
} = require('apollo-server-express');

const app = require('./app');
const config = require('./config/init');
const logger = require('./util/logger');
const resolvers = require('./graphql/resolvers/index');
const typeDefs = require('./graphql/typeDefs');

const {
  port,
} = require('./config');

(async () => {
  /** initialize database */
  await config.initializeDB();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    introspection: true,
    context: ({
      req,
    }) => {
      // TODO log request query or mutation
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

  // TODO session token implementation

  server.applyMiddleware({
    app,
  });

  app.listen({
    port,
  },
  () => logger.info(
    `🚀 Server ready at http://localhost:4000${server.graphqlPath}`,
  ));
})();
