import { App } from './App';
// import { Apps } from './Apps';
import { UserSchema, userResolvers } from './user';

const typeDefs = [UserSchema];
const resolvers = [userResolvers];

// const app = new Apps(typeDefs, resolvers);
const app = new App();

await app.configApollo(typeDefs, resolvers);
await app.startServer(4000);
// await app.startServer(4000);
