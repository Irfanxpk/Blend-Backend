// adminResolvers.ts
import { BlockUnblockUseCase } from "../../../application/use-cases/admin/BlockUnblockUseCase";
import { CreateAdminUseCase } from "../../../application/use-cases/admin/CreateAdminUseCase";
import { DeleteAdminUseCase } from "../../../application/use-cases/admin/DeleteAdminUseCase";
import { GetAdminUseCase } from "../../../application/use-cases/admin/GetAdminUseCase";
import { GetUsersUseCase } from "../../../application/use-cases/admin/GetUsersUseCase";
import { UpdateAdminUseCase } from "../../../application/use-cases/admin/UpdateAdminUseCase";
import { MongoAdminRepository } from "../../repositories/MongoAdminRepository";
import { MongoUserRepository } from "../../repositories/MongoUserRepository";

const adminRepository = new MongoAdminRepository();
const userRepository = new MongoUserRepository();

export const adminResolver = {
  Query: {
    getAdmin: async (
      _: any,
      { email, password }: { email: string; password: string }
    ) => {
      try {
        const getAdminUseCase = new GetAdminUseCase(adminRepository);
        const admin = await getAdminUseCase.execute(email, password);
        if (!admin) throw new Error("Admin not found or invalid password");
        return admin;
      } catch (error) {
        throw error;
      }
    },
    users: async () => {
      const getUsersUseCase = new GetUsersUseCase(userRepository);
       return await getUsersUseCase.execute();
   
    },
  },
  Mutation: {
    createAdmin: async (
      _: any,
      {
        name,
        email,
        password,
      }: { name: string; email: string; password: string }
    ) => {
      const createAdminUseCase = new CreateAdminUseCase(adminRepository);
      return await createAdminUseCase.execute(name, email, password);
    },

    BlockUnblockUser: async (_: any, { id }: { id: string }) => {
      const BlockUnbloc = new BlockUnblockUseCase(userRepository);
      const result = await BlockUnbloc.execute(id);
      console.log("result", result);
      if(result){
        return { message: "User Blocked successfully", success: true };
      }       
      return { message: "User UnBlocked successfully", success: true };
    },
    updateAdmin: async (
      _: any,
      {
        id,
        name,
        email,
        password,
      }: { id: string; name: string; email: string; password: string }
    ) => {
      const updateAdminUseCase = new UpdateAdminUseCase(adminRepository);
      return await updateAdminUseCase.execute(id, name, email, password);
    },
    deleteAdmin: async (_: any, { id }: { id: string }) => {
      const deleteAdminUseCase = new DeleteAdminUseCase(adminRepository);
      await deleteAdminUseCase.execute(id);
      return { id };
    },
  },
};
