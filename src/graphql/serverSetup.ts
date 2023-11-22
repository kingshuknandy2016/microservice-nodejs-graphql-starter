import { ApolloServer } from "@apollo/server";
import { readFileSync } from "fs";
import path from "path";
import resolvers from "./resolvers";

const schemaPath = path.resolve("./src/graphql/schema.graphql");

const typeDefs = `
${readFileSync(schemaPath, "utf8")}
`;

export const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const startApolloServer = async () => {
  await apolloServer.start();
};
