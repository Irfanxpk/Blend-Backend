import { User } from "../../../domain/entities";
import { IUserRepository } from "../../../application/repositories";

export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    id: string,
    username: string,
    email: string,
    password: string,
    dob: Date
  ): Promise<User> {
    const updatedUser = new User(id, username, email, password, dob);
    return await this.userRepository.update(updatedUser);
  }
}
