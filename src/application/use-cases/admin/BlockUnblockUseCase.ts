import { IUserRepository } from "../../../application/repositories";

export class BlockUnblockUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    id: string,
  ): Promise<Boolean|String> {
    // const updatedUser = this.userRepository.BlockUnblock(id);
    return await this.userRepository.BlockUnblock(id);
  }
}
