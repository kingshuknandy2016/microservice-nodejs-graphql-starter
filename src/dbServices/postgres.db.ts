import { Sequelize } from "sequelize-typescript";
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "../constants/global_constants";

export default class PostgresService {
  public readonly connection: Sequelize;
  dbName: string;
  dbUser: string;
  dbPassword: string;
  dbHost: string;
  dbPort: number;

  constructor() {
    this.dbName = DB_NAME;
    this.dbUser = DB_USER;
    this.dbPassword = DB_PASSWORD;
    this.dbHost = DB_HOST;
    this.dbPort = DB_PORT;
    this.connection = this.sequelizeConnection();
  }

  private sequelizeConnection(): Sequelize {
    const sequelize: Sequelize = new Sequelize({
      database: this.dbName,
      username: this.dbUser,
      password: this.dbPassword,
      host: this.dbHost,
      port: this.dbPort,
      dialect: "postgres",
      omitNull: true,
      logging: false, // Will not log
      models: [`${__dirname}/../models/`],
      modelMatch: (member, filename) => {
        return (
          filename.substring(0, filename.indexOf(".model")) ===
          member.toLowerCase()
        );
      },
    });

    return sequelize;
  }

  public connect(): Sequelize {
    return this.sequelizeConnection();
  }

  public close() {
    this.connection.close();
  }

  public isAuthenticated() {
    return new Promise((resolve, reject) => {
      this.connection
        .authenticate()
        .then(() => resolve(true))
        .catch((err) => {
          reject(err);
        });
    });
  }
}
