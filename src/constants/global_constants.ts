import dotenv from "dotenv";
import { Log } from "../loggers/logger.winston";
import path from "path";

dotenv.config({ path: path.resolve(".env") });

export const NODE_ENV = process.env.NODE_ENV || "development";
export const PORT = process.env.PORT || "3000";

// DB Configuration
export const DB_NAME = process.env.DB_NAME || "";
export const DB_USER = process.env.DB_USER || "";
export const DB_PASSWORD = process.env.DB_PASSWORD || "";
export const DB_HOST = process.env.DB_HOST || "";
export const DB_PORT = (process.env.DB_PORT as unknown as number) || 5432;

export const LOG: Log = {
  level: NODE_ENV === "production" ? "info" : "debug",
};

// AAuthentication Secrets
export const JWT_SECRET: string = process.env.JWT_SECRET || "123456";
export const tokenExpirationInSeconds = 36000;
