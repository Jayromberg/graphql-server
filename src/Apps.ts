import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
// import IMyContext from './interfaces/IMyContext';
import { UsersAPI } from './user';

interface ContextValue {
  dataSources: {
    usersAPI: UsersAPI
  }
}

class Apps {
  readonly apolloServer: any;

  constructor (typeDefs: any, resolvers: any) {
    this.apolloServer = new ApolloServer<ContextValue>({
      typeDefs,
      resolvers
    });
  }

  public async startServer (PORT: number): Promise<void> {
    const { url } = await startStandaloneServer(this.apolloServer, {
      listen: { port: PORT },
      context: async () => {
        const { cache } = this.apolloServer;
        return {
          dataSources: {
            usersAPI: new UsersAPI({ cache })
          }
        };
      }
    });

    console.log(`🚀  Server ready at: ${url}`);
  }
}

export { Apps };
