const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    prisma,
  }
});

server.listen().then(({ url }) => {
  console.log(`Server running at ${url}`);
});