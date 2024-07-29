import { IUserRepository } from "../../repositories";


export class GetUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<{} | null> {
    return await this.userRepository.find();
  }
}