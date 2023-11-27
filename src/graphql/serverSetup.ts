import { ApolloServer, BaseContext } from "@apollo/server";
import { readFileSync } from "fs";
import path from "path";
import { resolvers } from "./resolvers";

const schemaPath = path.resolve("./src/graphql/schema.graphql");

const typeDefs = `
${readFileSync(schemaPath, "utf8")}
`;

export interface UserInterface {
  email?: string;
  name: string;
  role?: string;
  token: string;
}

interface GraphQLContext {
  token: string | string[];
}
export const apolloServer = new ApolloServer<GraphQLContext>({
  typeDefs,
  resolvers,
});

export const startApolloServer = async () => {
  await apolloServer.start();
};
