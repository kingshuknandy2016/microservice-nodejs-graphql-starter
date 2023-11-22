import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants/global_constants";
import logger from "../loggers/logger.winston";

class JWT {
  async authenticateJWT(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.token;

    if (authHeader && authHeader !== "null") {
      jwt.verify(authHeader as string, JWT_SECRET, (err, decoded) => {
        if (err) {
          return res
            .status(401)
            .json({ error: true, message: "Unauthorized access." });
        }
        next();
      });
    } else {
      res.status(403).json({ success: false, message: "UnAuthorized" });
    }
  }
}

export default new JWT();
