const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
const fs = require("fs").promises;
const path = require("path");

const prisma = new PrismaClient();
const Review = require("./resolvers/Review");
const User = require("./resolvers/User");
const Attraction = require("./resolvers/Attraction");
const Place = require("./resolvers/Place");
const Country = require("./resolvers/Country");

const { getUserId } = require("./utils")

const resolvers = {
  Query: {
    ...Country.queries,
    ...Place.queries,
    ...Attraction.queries,
    ...User.queries,
    ...Review.queries
  },
  Mutation: {
    ...Country.mutations,
    ...Place.mutations,
    ...Attraction.mutations,
    ...User.mutations,
    ...Review.mutations
  },
  Review: Review.resolvers,
  User: User.resolvers,
  Attraction: Attraction.resolvers,
  Place: Place.resolvers,
  Country: Country.resolvers,
};

async function buildServer() {
  const filenames = await fs.readdir(path.join(__dirname, "typeDefs"), "utf8");
  const filesPromise = filenames.map((filename) => {
    return fs.readFile(path.join(__dirname, `typeDefs/${filename}`), "utf8");
  });
  const typeDefs = await Promise.all(filesPromise);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      return {
        ...req,
        prisma,
        userId: req && req.headers.authorization ? getUserId(req) : undefined
      };
    },
  });

  return server;
}

async function main() {
  const server = await buildServer();
  const { url } = await server.listen();
  console.log(`Server is running on ${url}`);
}
main();
