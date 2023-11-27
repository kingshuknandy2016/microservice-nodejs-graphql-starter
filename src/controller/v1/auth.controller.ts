import { NextFunction, Request, Response } from "express";
import UserService from "../../service/user.service";
import Password from "../../helpers/password";
import jwt from "jsonwebtoken";
import {
  JWT_SECRET,
  tokenExpirationInSeconds,
} from "../../constants/global_constants";
import logger from "../../loggers/logger.winston";
import { generateToken, verifyToken } from "../../helpers/tokenGenerator";

const userService = new UserService();

/**
 * @description Responsible for authentication
 */
export class AuthController {
  /**
   * @description User Sign Up
   */
  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      const hashed = await Password.toHash(password);
      const user = await userService.findUserByEmail(email);
      // Already the User Exist
      if (user) {
        return res.status(403).json({ message: "Already the user exist" });
      }

      // Storing the User in database
      const newUser = await userService.registerUser({
        name,
        email,
        password: hashed,
      });

      // Jwt Token Generation
      const token = generateToken(newUser);
      return res.status(200).json({
        success: true,
        message: "Successfully Inserted the User",
        data: { name: newUser.name, email: newUser.email },
        token,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   *@description login method
   * @param req
   * @param res
   * @param next
   * @returns
   */
  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await userService.findUserByEmail(email);
      // If the user is found
      if (user) {
        const isPasswordMatch = await Password.compare(user.password, password);
        if (isPasswordMatch) {
          const token = generateToken(user);
          return res.status(200).json({
            success: true,
            message: "Successfully Logged In",
            data: { name: user.name, email: user.email },
            token,
          });
        } else {
          return res.status(401).json({ message: "Incorrect Password" });
        }
      }
    } catch (error) {
      next(error);
    }
  }
}
