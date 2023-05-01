import { App } from './App';
import { UserSchema } from './user';

const typeDefs = [UserSchema];
const resolvers = {};

const app = new App();

await app.configApollo(typeDefs, resolvers);
await app.startServer(4000);
