import { GraphQLError } from "graphql";

export enum GraphQLErrorCode {
  UNAUTHORIZED = "UNAUTHORIZED",
  TIMEOUT = "TIMEOUT",
}

export const graphQLErrorHandler = (
  message: string,
  code: GraphQLErrorCode,
  status: number,
) => {
  throw new GraphQLError(message, {
    extensions: {
      code,
      http: { status },
    },
  });
};
