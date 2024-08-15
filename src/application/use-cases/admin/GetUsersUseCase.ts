import { IUserRepository } from "../../repositories";


export class GetUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<{} | null> {
    const res = await this.userRepository.find();
    console.log("res", res);
    return res;
  }
}