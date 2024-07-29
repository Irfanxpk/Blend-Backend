// CreateAdminUseCase.ts
import argon2  from "argon2";
import { Admin } from "../../../domain/entities";
import { IAdminRepository } from "../../repositories";

export class CreateAdminUseCase {
  constructor(private adminRepository: IAdminRepository) {}

  async execute(
    name: string,
    email: string,
    password: string
  ): Promise<Admin> {

    const hashedPass = await argon2.hash(password);

    const newAdmin = new Admin("", name, email, hashedPass); // Generate ID as needed
    return await this.adminRepository.create(newAdmin);
  }
}


