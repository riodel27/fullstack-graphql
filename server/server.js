const { ApolloServer } = require('apollo-server');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers/index');

const init = async () => {
  // setup database connection either mongo or postgresql

  // setup session authentication

  // middlewares

  // logger

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // context: ({ req }) => ({ req, pubsub })
  });

  // error handling

  server.listen({ port: 4000 });
};

init();
