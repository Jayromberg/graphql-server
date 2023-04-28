import express from 'express';
import http from 'http';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { UserSchema } from './user';

const typeDefs = [UserSchema];
const resolvers = {};

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers
});

await server.start();

app.use(
  '/',
  expressMiddleware(server)
)

await new Promise<void>((resolve) => httpServer.listen({ port: 4001 }, resolve));
console.log('🚀 Server ready at http://localhost:4000/');
