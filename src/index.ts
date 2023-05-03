// import { App } from './Apps.ts_';
import { App } from './App';
import { UserSchema, userResolvers } from './user';

const typeDefs = [UserSchema];
const resolvers = [userResolvers];

const app = new App(typeDefs, resolvers);
// const app = new App();

// await app.configApollo(typeDefs, resolvers);
// await app.startServer(4000);
await app.startServer(4000);
