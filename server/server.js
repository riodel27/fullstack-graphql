const { ApolloServer } = require('apollo-server');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers/index');

const init = async () => {
  // setup database connection either mongo or postgresql

  // middlewares

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // context: ({ req }) => ({ req, pubsub })
  });

  server.listen({ port: 4000 });
};

init();
