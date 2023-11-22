import express, { Express, Request, Response, Application } from "express";
import fs from "fs";
import path from "path";
import YAML from "yamljs";
import swagger from "swagger-express-middleware";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import http from "http";
import Debug from "debug";
import { handleErrors } from "./middlewares/error-handler.middleware";
import { PORT } from "./constants/global_constants";
import { IndexRouter } from "./routes";
import { Postgres } from "./dbServices";
import logger from "./loggers/logger.winston";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { expressMiddleware } from "@apollo/server/express4";
import { apolloServer, startApolloServer } from "./graphql/serverSetup";

const swaggerYamlPath = path.resolve("./swagger-definition.yaml");

const debug = Debug("microservice-application");

export default class ServiceConfiguration {
  app: Application;
  port: number;
  server: http.Server;

  constructor() {
    this.app = express();
    this.port = PORT as unknown as number;
    this.server = new http.Server();
  }

  // Swagger Initialization Helper
  initializeSwagger = (): Promise<swagger.SwaggerMiddleware> => {
    return new Promise((resolve, reject) => {
      return swagger(swaggerYamlPath, this.app, (err, middleware) => {
        if (err) {
          reject(err);
        } else {
          resolve(middleware);
        }
      });
    });
  };
  configureApplication = (): Promise<Application> => {
    this.app.set("port", this.port);
    return new Promise(async (resolve, reject) => {
      try {
        // Registering Common Middleware
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        //Graphql Middleware Setup
        await startApolloServer();
        this.app.use(
          "/graphql",
          cors<cors.CorsRequest>(),
          express.json(),
          expressMiddleware(apolloServer),
        );

        // Swagger Express Middleware Setup
        fs.promises.readFile(swaggerYamlPath).then((swaggerConfig) => {
          swaggerConfig = YAML.parse(swaggerConfig.toString("utf-8"));
          this.initializeSwagger().then(
            (middleware: swagger.SwaggerMiddleware) => {
              const corsOptions = [
                middleware.metadata(),
                middleware.CORS(),
                middleware.parseRequest(),
                middleware.validateRequest(),
              ];
              const allowedOrigin = "*";
              this.app.use(cors({ origin: allowedOrigin }));
              this.app.use(express.json()); // parse requests of content-type - application/json
              this.app.use(express.urlencoded({ extended: false })); // parse requests of content-type - application/x-www-form-urlencoded
              this.app.use(
                "/api-docs",
                swaggerUi.serve,
                swaggerUi.setup(swaggerConfig),
              );
            },
          );
        });

        this.app.use(handleErrors);
        // Testing Basic Route(Health)
        this.app.get("/health", (req: Request, res: Response) => {
          res.send("Express Server is healthy");
        });

        // Registering the Router
        this.app.use("/", new IndexRouter().router);
        resolve(this.app);
      } catch (error) {
        reject(error);
      }
    });
  };

  //Event listener for HTTP server "error" event.
  onError(error: any) {
    if (error.syscall !== "listen") {
      throw error;
    }

    const bind =
      typeof this.port === "string" ? "Pipe " + this.port : "Port " + this.port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case "EACCES":
        console.error(bind + " requires elevated privileges");
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  // Event listener for HTTP server "listening" event.
  onListening() {
    debug("Server is listening");
    console.log("Server is listening");
    // const addr = this.server.address();
    // console.log(`"Listening on : ${addr}`);
    // debug("Listening on " + addr);
  }

  startApplication = (): Promise<http.Server> => {
    return new Promise((resolve, reject) => {
      Postgres.isAuthenticated()
        .then(() => {
          logger.info("Database Authentication is Successful");
        })
        .catch((error) => {
          logger.error(`Authentication is not successful : ${error}`);
        });

      Postgres.connection
        .sync({ alter: true })
        .then(() => logger.info(`Database is Connected`))
        .catch((error) =>
          logger.error(`Unable to connect with Database. ${error}`),
        );

      this.configureApplication()
        .then(() => {
          // Create HTTP server
          this.server = http.createServer(this.app);
          this.server.on("listening", this.onListening);
          this.server.on("error", this.onError);
          this.server.listen(this.port);
          resolve(this.server);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
