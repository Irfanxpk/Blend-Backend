import { Admin } from "../../../domain/entities";
import { IAdminRepository } from "../../../application/repositories";

export class UpdateAdminUseCase {
  constructor(private adminRepository: IAdminRepository) {}

  async execute(
    id: string,
    name: string,
    email: string,
    password: string
  ): Promise<Admin> {
    const updatedAdmin = new Admin(id, name, email, password);
    return await this.adminRepository.update(updatedAdmin);
  }
}
