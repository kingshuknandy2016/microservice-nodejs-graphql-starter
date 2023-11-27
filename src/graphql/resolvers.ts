import { GraphQLError } from "graphql";
import Password from "../helpers/password";
import UserService from "../service/user.service";
import { GraphQLErrorCode, graphQLErrorHandler } from "./Error";
import {
  UserTokenData,
  generateToken,
  verifyToken,
} from "../helpers/tokenGenerator";
interface LoginUserData {
  name: string;
  email: string;
  token: string;
}

export const resolvers = {
  Query: {
    hello: () => "Hello world!",
    helloTest: () => "I am checking",
    getAllUsers: async (
      _parent: any,
      _args: any,
      contextValue: { token: string },
    ) => {
      const { token } = contextValue;
      if (token === "") {
        graphQLErrorHandler(
          "Invalid Token. Token is empty. Please pass a valid token",
          GraphQLErrorCode.TIMEOUT,
          401,
        );
      }
      try {
        const decode: UserTokenData = verifyToken(contextValue.token);
        const userService = new UserService();
        const data = await userService.getUsers();
        return data;
      } catch (error) {
        graphQLErrorHandler(
          "Error while getting the User",
          GraphQLErrorCode.TIMEOUT,
          401,
        );
      }
    },
  },
  Mutation: {
    login: async (
      _parent: any,
      { email, password }: { email: string; password: string },
    ): Promise<LoginUserData> => {
      const userService = new UserService();
      const user = await userService.findUserByEmail(email);
      if (user) {
        const isPasswordMatch = await Password.compare(user.password, password);
        if (isPasswordMatch) {
          const token = generateToken(user);
          return { name: user.name, email: user.email, token };
        } else {
          throw new GraphQLError("Incorrect Password", {
            extensions: {
              code: "UNAUTHORIZED",
              http: { status: 401 },
            },
          });
        }
      } else {
        // If the user is not found
        throw new GraphQLError("User Not found", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }
    },
  },
};
