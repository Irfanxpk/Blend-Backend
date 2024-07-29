import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Admin {
    id: ID!
    name: String!
    email: String!
  }

  type user {
    id: ID!
    name: String!
    email: String!
    image: String!
    IsBlocked: Boolean!
  }

  type User {
    id: ID!
    name: String!
  }

  type AuthPayload {
    token: String!
    user: User!
    message: String!
  }

  type Query {
    getAdmin(email: String!, password: String!): Admin
    getUser(id: ID!): User
    users: [user]
  }

  type OtpResponse {
    success: Boolean!
    user: User
    token: String
  }

  type LoginResponse {
    user: User
    token: String
    success: Boolean
    message: String
  }

  type message {
    user: User
  }

 type Reset {
   success: Boolean!
   message: String
   
 }

  type Mutation {
    validateOtp(email: String!, otp: String!, id: String!): OtpResponse!
    login(email: String!, password: String!): LoginResponse
    resetPassword(email: String!): message
    updateAdmin(
      id: ID!
      displayName: String!
      email: String!
      password: String!
    ): Admin
    deleteAdmin(id: ID!): Admin

    createUser(
      name: String!
      email: String!
      password: String!
      dob: String!
    ): AuthPayload

    createUser_google(key: String!): message

    createAdmin(name: String!, email: String!, password: String!): Admin

    updateUser(id: ID!, name: String!, email: String!, password: String!): User
    deleteUser(id: ID!): User
  }
`;
