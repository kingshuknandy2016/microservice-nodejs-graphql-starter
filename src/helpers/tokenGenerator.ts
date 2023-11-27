import jwt from "jsonwebtoken";
import {
  JWT_SECRET,
  tokenExpirationInSeconds,
} from "../constants/global_constants";
import User from "../models/user.model";

/**
 * @description The data to be passed into the token for encryption
 */
export interface UserTokenData {
  name: string;
  email: string;
}

/**
 * @description  Generates token
 * @param User Model Object
 * @returns JWT Token
 */
export const generateToken = (user: User): string => {
  const { name, email } = user;
  const userData: UserTokenData = {
    name,
    email,
  };
  const token = jwt.sign({ userData }, JWT_SECRET, {
    expiresIn: tokenExpirationInSeconds,
  });
  return token;
};

/**
 * @description Verifies the Token Signature
 * @param token
 * @returns User Token Data if Signature is Valid
 */
export const verifyToken = (token: string): UserTokenData => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    const tokenData: UserTokenData = decoded["userData"];
    return tokenData;
  } catch (err: any) {
    throw new Error("Invalid token:" + err);
  }
};
