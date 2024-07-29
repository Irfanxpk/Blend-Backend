// userResolvers.ts
import { CreateUserUseCase } from "../../../application/use-cases/user/CreateUserUseCase";
import { DeleteUserUseCase } from "../../../application/use-cases/user/DeleteUserUseCase";
import { GetUserUseCase } from "../../../application/use-cases/user/GetUserUseCase";
import { UpdateUserUseCase } from "../../../application/use-cases/user/UpdateUserUseCase";
import { MongoUserRepository } from "../../repositories/MongoUserRepository";
import { ValidateOtpUseCase } from "../../../application/use-cases/user/ValidateOtpUseCase";
import jwt from "jsonwebtoken";
import { LoginUserUseCase } from "../../../application/use-cases/user/LoginUserUseCase";
import { randomBytes } from "crypto";

const userRepository = new MongoUserRepository();

export const userResolver = {
  Query: {
    getUser: async (_: any, { id }: { id: string }) => {
      const getUserUseCase = new GetUserUseCase(userRepository);
      return await getUserUseCase.execute(id);
    },
  },
  Mutation: {
    createUser: async (
      _: any,
      {
        name,
        email,
        password,
        dob,
      }: { name: string; email: string; password: string; dob: Date }
    ) => {
      const createUserUseCase = new CreateUserUseCase(userRepository);
      const user = await createUserUseCase.execute({
        name,
        email,
        password,
        dob,
      });
      console.log("user", user);
      return user;
    },

    createUser_google : async (_:any, { key }: { key: string }) => {
      const data = jwt.decode(key);
      console.log("key", key, data);

      const createUserUseCase = new CreateUserUseCase(userRepository);

      // if(!data) return false ;
      const user = await createUserUseCase.execute({
        name: typeof data === "string" || !data ? data : data.name,
        email: typeof data === "string"|| !data ? data : data.email,
        password: randomBytes(16).toString("hex"),
        dob: new Date(),
      });
      console.log("user", user);


      return user ;
    },

    validateOtp: async (_: any, { email, otp, id }: { email: string; otp: string; id: string }) => {
      try {
          console.log("email, otp, id", email, otp, id);
        const validateOtpUseCase = new ValidateOtpUseCase(userRepository);
          console.log("email, otp, id", email, otp, id);

        const user = await validateOtpUseCase.execute(email, otp, id);
        console.log("user", user);
        if (user) {
          const token = jwt.sign({ userId: user.id }, "gdfsgsdgsdfg", {
            expiresIn: "1h",
          });
          return { success: true, user, token };
        }
        return { success: false, user: null, token: null };
      } catch (error) {
        console.error("Error validating OTP:", error);
        throw new Error("Failed to validate OTP");
      }
    },

    login : async (_:any, { email, password }: { email: string; password: string }) => {
      const loginUserUseCase = new LoginUserUseCase(userRepository);
      const user = await loginUserUseCase.execute(email, password);
      if (user) {
        const token = jwt.sign({ userId: user.id }, "gdfsgsdgsdfg", {
          expiresIn: "1h",
        });
        return { success: true, user, token };
      }
      return { success: false, user: null, token: null };
    },

    resetPassword : async (_:any, { email }: { email: string }) => {
      
    },

    
    updateUser: async (
      _: any,
      {
        id,
        name,
        email,
        password,
        dob,
      }: {
        id: string;
        name: string;
        email: string;
        password: string;
        dob: Date;
      }
    ) => {
      const updateUserUseCase = new UpdateUserUseCase(userRepository);
      return await updateUserUseCase.execute(id, name, email, password, dob);
      console.log("updateUserUseCase", updateUserUseCase);
    },
    deleteUser: async (_: any, { id }: { id: string }) => {
      const deleteUserUseCase = new DeleteUserUseCase(userRepository);
      await deleteUserUseCase.execute(id);
      return { id };
    },
  },
};
