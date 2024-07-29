import { Admin } from "../../../domain/entities";
import { IAdminRepository } from "../../../application/repositories";
import argon2 from "argon2";

export class GetAdminUseCase {
  constructor(private adminRepository: IAdminRepository) {}

  async execute(email: string, password: string): Promise<Admin | null> {
    try {
      const admin = await this.adminRepository.getByEmail(email);
      if (!admin) {
        console.error("Admin not found");
        return null;
      }

      const password_check = await argon2.verify(admin.password, password);

      if (!password_check) {
        console.error("Invalid password");
        return null;
      }

      return admin;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
