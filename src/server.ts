// src/server.ts
import express, { Application, Request } from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import cors from "cors";
import jwt, { JwtPayload } from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { typeDefs } from "./infrastructure/graphql/typeDefs";
import { adminResolver } from "./infrastructure/graphql/resolvers/adminResolvers";
import { userResolver } from "./infrastructure/graphql/resolvers/userResolvers";
import { CustomError } from "./application/errors";
import dotenv from "dotenv";
import { verifyToken } from "./infrastructure";
import { GraphQLError } from "graphql";
dotenv.config();


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
  
  // app.use(cors(corsOptions));
  app.use(cookieParser());
  // app.use(errorHandler());  
  const MONGODB_URI = process.env.MONGODB_URI;


  try {
     mongoose.connect(`${MONGODB_URI}?useNewUrlParser=true`);
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }


  const server = new ApolloServer({
    typeDefs,
    resolvers: [adminResolver, userResolver],
    context: ({ req }: { req: Request }) => {
      const publicOperations = [
        // "LoginUser",
        "createUser_google",
        "ForgetPassword",
        "CheckToken",
        "ResetPassword",
        "createUser",
      ];
      if (publicOperations.includes(req.body.operationName)) return {};
      console.log(req.body.operationName)
      console.log(req.headers);

      const token = req.cookies.token;
      // if (!token) return { userId: null };
      
      try {
        if (!process.env.JWT_SECRET||!token)
          throw new Error("error while verifying token");
        console.log("decodedToken");
        const decodedToken = verifyToken(token) as JwtPayload;
        console.log("decodedToken", decodedToken);
        
        if(!decodedToken || !decodedToken.userId) throw new GraphQLError("User is not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
        return { userId: decodedToken.userId };
      } catch (err) {
        console.log("error while verifying token", err);
        throw new Error("error while verifying token", err);
      }
    },
  });
  try {
    await server.start();
    server.applyMiddleware( {app,cors:corsOptions} );
  } catch (error) {
    console.error("Failed to start Apollo Server:", error);
    process.exit(1);
  }

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
