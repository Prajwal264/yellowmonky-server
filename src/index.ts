import 'reflect-metadata';
import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { createConnection } from 'typeorm';
import Container from 'typedi';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import cors from 'cors';
import { formatError } from './helpers/error.helper';

/**
 *
 *
 * @class Server
 */
class Server {
  /**
   *
   *
   * @private
   * @type {(string | number)}
   * @memberof Server
   */
  private port: string | number;

  /**
   *
   *
   * @private
   * @type {Application}
   * @memberof Server
   */
  private app: Application;

  /**
   *
   *
   * @private
   * @type {ApolloServer}
   * @memberof Server
   */
  private graphQLServer: ApolloServer;

  /**
   *
   *
   * @memberof Server
   */
  public async init() {
    this.confgure();
    await this.setup();
    this.listen();
  }

  /**
   *
   *
   * @private
   * @memberof Server
   */
  private confgure() {
    this.configurePort();
    createConnection();
  }

  /**
   *
   *
   * @private
   * @memberof Server
   */
  private configurePort() {
    this.port = process.env.PORT || 4000;
  }

  /**
   *
   *
   * @private
   * @memberof Server
   */
  private async setup() {
    this.createExpressApplication();
    await this.createGraphQLServer();
  }

  /**
   *
   *
   * @private
   * @memberof Server
   */
  private createExpressApplication() {
    this.app = express();
    this.app.use(cors());
  }

  /**
   *
   *
   * @private
   * @memberof Server
   */
  private async createGraphQLServer() {
    const schema = await buildSchema({
      resolvers: [`${__dirname}/**/*.resolver.{ts,js}`],
      container: Container,
      emitSchemaFile: './src/generated/schema.gql',
    });
    this.graphQLServer = new ApolloServer({
      schema,
      plugins: [ApolloServerPluginLandingPageGraphQLPlayground({
        subscriptionEndpoint: 'ws:/localhost:4001/graphql',
      })],
      formatError,
    });

    await this.graphQLServer.start();

    this.graphQLServer.applyMiddleware({ app: this.app });

    const server = this.app.listen(4001, () => {
      // create and use the websocket server
      const wsServer = new WebSocketServer({
        server,
        path: '/graphql',
      }).once('connection', () => {
        console.log('websocket connected');
      });
      useServer({ schema }, wsServer);
    });
  }

  /**
   *
   *
   * @private
   * @memberof Server
   */
  private listen() {
    const { port } = this;
    this.app.listen(port, () => {
      console.log(`Server is running at ${port}`);
    });
  }
}

/**
 *
 *
 */
const bootstrap = async () => {
  const server = new Server();
  server.init();
};

bootstrap();
