// import { Admin } from "../../domain/entities/Admin";
// import { IAdminRepository } from "../../application/repositories/IAdminRepository";

// // Example resolver for admin operations
// export const adminResolver = {
//   Query: {
//     getAdmin: async (parent: any, args: { id: string }, context: any) => {
//       const adminRepository: IAdminRepository = context.adminRepository;
//       const admin = await adminRepository.findById(args.id);
//       return admin;
//     },
//   },
//   Mutation: {
//     createAdmin: async (
//       parent: any,
//       args: { displayName: string; email: string; password: string },
//       context: any
//     ) => {
//       const adminRepository: IAdminRepository = context.adminRepository;
//       const { displayName, email, password } = args;
//       const newAdmin = new Admin("", displayName, email, password); // Generate ID as needed
//       const createdAdmin = await adminRepository.save(newAdmin);
//       return createdAdmin;
//     },
//     updateAdmin: async (
//       parent: any,
//       args: {
//         id: string;
//         displayName: string;
//         email: string;
//         password: string;
//       },
//       context: any
//     ) => {
//       const adminRepository: IAdminRepository = context.adminRepository;
//       const { id, displayName, email, password } = args;
//       const adminToUpdate = await adminRepository.findById(id);
//       if (!adminToUpdate) {
//         throw new Error("Admin not found");
//       }
//     //   adminToUpdate.displayName = displayName;
//     //   adminToUpdate.email = email;
//     //   adminToUpdate.password = password;
//       const updatedAdmin = await adminRepository.update(adminToUpdate);
//       return updatedAdmin;
//     },
//     deleteAdmin: async (parent: any, args: { id: string }, context: any) => {
//       const adminRepository: IAdminRepository = context.adminRepository;
//       const { id } = args;
//       const adminToDelete = await adminRepository.findById(id);
//       if (!adminToDelete) {
//         throw new Error("Admin not found");
//       }
//     //   await adminRepository.delete(id);
//       return adminToDelete;
//     },
//   },
// };


// resolvers.ts
// import { adminResolver } from './adminResolvers';
// import { userResolver } from './userResolvers';

// export const resolvers = {
//   Query: {
//     ...adminResolver.Query,
//     ...userResolver.Query,
//   },
//   Mutation: {
//     ...adminResolver.Mutation,
//     ...userResolver.Mutation,
//   },
// };

// // typeDefs.ts
// import { gql } from 'apollo-server-express';

// export const typeDefs = gql`
//   type Admin {
//     id: ID!
//     displayName: String!
//     email: String!
//     password: String!
//   }

//   type User {
//     id: ID!
//     username: String!
//     email: String!
//     password: String!
//   }

//   type Query {
//     getAdmin: Admin
//     getUser(id: ID!): User
//   }

//   type Mutation {
//     createAdmin(displayName: String!, email: String!, password: String!): Admin
//     updateAdmin(id: ID!, displayName: String, email: String, password: String): Admin
//     deleteAdmin(id: ID!): Boolean

//     createUser(username: String!, email: String!, password: String!): User
//     updateUser(id: ID!, username: String, email: String, password: String): User
//     deleteUser(id: ID!): Boolean
//   }
// `;

// Example implementation of Apollo Server with Express
// Ensure to set up context to inject repositories
