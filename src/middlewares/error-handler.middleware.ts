import { NextFunction, Request, Response } from "express";
import logger from "../loggers/logger.winston";

export const handleErrors = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  logger.error(error);
  logger.info(`Error handled by Middleware`);
};
