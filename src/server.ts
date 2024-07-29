import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import cors from "cors";
import { typeDefs } from "./infrastructure/graphql/typeDefs";
import { adminResolver } from "./infrastructure/graphql/resolvers/adminResolvers";
import { userResolver } from "./infrastructure/graphql/resolvers/userResolvers";
require("dotenv").config();


const startServer = async () => {
  const app = express() as any;
  app.use(express.json());


  const corsOptions = {
    origin: [
      "http://localhost:5173",
      "https://9ctdrrcv-5173.inc1.devtunnels.ms/",
    ], 
    credentials: true,
  };

  app.use(cors(corsOptions));
const MONGODB_URI = process.env.MONGODB_URI;


  try {
    await mongoose.connect(`${MONGODB_URI}?useNewUrlParser=true`);
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }


  const server = new ApolloServer({
    typeDefs,
    resolvers: [adminResolver, userResolver],
  });
  try {
    await server.start();
    server.applyMiddleware( {app} );
  } catch (error) {
    console.error("Failed to start Apollo Server:", error);
    process.exit(1);
  }

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
