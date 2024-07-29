import { IAdminRepository } from "../../../application/repositories";

export class DeleteAdminUseCase {
  constructor(private adminRepository: IAdminRepository) {}

  async execute(id: string): Promise<void> {
    return await this.adminRepository.delete(id);
  }
}
