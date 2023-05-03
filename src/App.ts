import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ContextValue } from './ContextValue';

class App {
  private readonly apolloServer: ApolloServer<ContextValue>;

  constructor (typeDefs: any, resolvers: any) {
    this.apolloServer = new ApolloServer<ContextValue>({
      typeDefs,
      resolvers
    });
  }

  public async startServer (PORT: number): Promise<void> {
    const { url } = await startStandaloneServer(this.apolloServer, {
      listen: { port: PORT },
      context: async ({ req }) => new ContextValue({ req, server: this.apolloServer })
    });

    console.log(`🚀  Server ready at: ${url}`);
  }
}

export { App };
