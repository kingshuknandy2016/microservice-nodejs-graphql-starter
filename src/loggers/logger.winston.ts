import winston from "winston";
import { LOG } from "../constants/global_constants";

export interface Log {
  level: "info" | "debug" | "error" | "warn";
}
const logger = winston.createLogger({
  transports: [new winston.transports.Console({ level: LOG.level })],
});
export default logger;
