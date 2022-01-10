"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const apollo_server_core_1 = require("apollo-server-core");
const typeorm_1 = require("typeorm");
const typedi_1 = __importDefault(require("typedi"));
const ws_1 = require("ws");
const ws_2 = require("graphql-ws/lib/use/ws");
const cors_1 = __importDefault(require("cors"));
const error_helper_1 = require("./helpers/error.helper");
class Server {
    async init() {
        this.confgure();
        await this.setup();
        this.listen();
    }
    confgure() {
        this.configurePort();
        (0, typeorm_1.createConnection)();
    }
    configurePort() {
        this.port = process.env.PORT || 4000;
    }
    async setup() {
        this.createExpressApplication();
        await this.createGraphQLServer();
    }
    createExpressApplication() {
        this.app = (0, express_1.default)();
        this.app.use((0, cors_1.default)());
    }
    async createGraphQLServer() {
        const schema = await (0, type_graphql_1.buildSchema)({
            resolvers: [`${__dirname}/**/*.resolver.{ts,js}`],
            container: typedi_1.default,
            emitSchemaFile: './src/generated/schema.gql',
        });
        this.graphQLServer = new apollo_server_express_1.ApolloServer({
            schema,
            plugins: [(0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)()],
            formatError: error_helper_1.formatError,
        });
        await this.graphQLServer.start();
        this.graphQLServer.applyMiddleware({ app: this.app });
        const server = this.app.listen(4001, () => {
            this.wsServer = new ws_1.WebSocketServer({
                server,
                path: '/ws',
            });
            (0, ws_2.useServer)({ schema }, this.wsServer);
        });
    }
    listen() {
        const { port } = this;
        this.app.listen(port, () => {
            console.log(`Server is running at ${port}`);
        });
    }
}
const bootstrap = async () => {
    const server = new Server();
    server.init();
};
bootstrap();
//# sourceMappingURL=index.js.map