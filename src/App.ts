import express from 'express';
import cors from 'cors';
import http from 'http';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
import IMyContext from './interfaces/IMyContext';
import { UsersAPI } from './user';

class App {
  public app: express.Express;
  protected httpServer: http.Server;
  protected apolloServer: any;

  constructor () {
    this.app = express();
    this.httpServer = http.createServer(this.app);
    this.config();

    // Não remover essa rota
    this.app.get('/tests', (_req, res) => res.json({ ok: true }));
  }

  private config (): void {
    this.app.use(cors<cors.CorsRequest>({
      origin: '*'
    }));
    this.app.use(bodyParser.json());
  }

  public async configApollo (typeDefs: any, resolvers: any): Promise<void> {
    const httpServer = this.httpServer;

    this.apolloServer = new ApolloServer<IMyContext>({
      typeDefs,
      resolvers,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
    });

    await this.apolloServer.start();
  }

  public async startServer (PORT: number): Promise<void> {
    this.app.use(
      expressMiddleware(this.apolloServer, {
        context: async ({ req }) => {
          const { cache } = this.apolloServer;
          const token = req.headers.token;

          return {
            token,
            dataSources: {
              usersAPI: new UsersAPI({ cache })
            }
          };
        }
      })
    )

    await new Promise<void>((resolve) => this.httpServer.listen({ port: PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:${PORT}/`);
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
