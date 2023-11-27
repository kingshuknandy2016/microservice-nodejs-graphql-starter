import { Request, Response, NextFunction } from "express";
import { UserTokenData, verifyToken } from "../helpers/tokenGenerator";

class JWT {
  async authenticateJWT(req: Request, res: Response, next: NextFunction) {
    const { token } = req.headers;
    if (token && token !== "null") {
      try {
        const decoded: UserTokenData = verifyToken(token as string);
        // Passing values to the next middleware
        res.locals.user = decoded;
        next();
      } catch (error) {
        return res
          .status(401)
          .json({ error: true, message: "Unauthorized access." });
      }
    } else {
      res.status(403).json({ success: false, message: "Token is empty" });
    }
  }
}

export default new JWT();
