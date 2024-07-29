import { User } from "../../../domain/entities";
import { IUserRepository } from "../../../application/repositories";

export class GetUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string): Promise<User | null> {
    return await this.userRepository.findById(id);
  }
}
