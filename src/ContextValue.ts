import { ApolloServer } from '@apollo/server';
import { IncomingMessage } from 'http';
import { UsersAPI } from './user';

export class ContextValue {
  public token: string;
  public dataSources: {
    usersAPI: UsersAPI
  };

  constructor ({ req, server }: { req: IncomingMessage, server: ApolloServer<ContextValue> }) {
    this.token = req.headers.authorization;
    const { cache } = server;
    this.dataSources = {
      usersAPI: new UsersAPI({ cache, contextValue: this })
    };
  }
}
