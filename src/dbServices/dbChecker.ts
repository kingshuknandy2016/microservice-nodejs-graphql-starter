import { Sequelize } from "sequelize-typescript";
import logger from "../loggers/logger.winston";
import User from "../models/user.model";
import PostgresService from "./postgres.db";
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "../constants/global_constants";

export const testDb = async () => {
  try {
    // Initialize the Sequelize
    const connection: Sequelize = new Sequelize({
      database: DB_NAME,
      username: DB_USER,
      password: DB_PASSWORD,
      host: DB_HOST,
      port: DB_PORT,
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

    connection
      .authenticate()
      .then(() => {
        logger.info("Database Authentication is Successful");
      })
      .catch((error) => {
        logger.error(`Authentication is not successful : ${error}`);
      });

    connection
      .sync({ alter: true })
      .then(() => logger.info(`Database is Connected`))
      .catch((error) =>
        logger.error(`Unable to connect with Database. ${error}`),
      );

    // Find all users
    const users: User[] = await User.findAll();
    logger.info(`${JSON.stringify(users)}`);
  } catch (error) {
    logger.error(`Error Occurred in DB Processing. ${error}`);
  }
};
