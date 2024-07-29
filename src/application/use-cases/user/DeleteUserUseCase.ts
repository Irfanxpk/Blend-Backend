import { IUserRepository } from "../../../application/repositories";

export class DeleteUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string): Promise<void> {
    return await this.userRepository.delete(id);
  }
}
