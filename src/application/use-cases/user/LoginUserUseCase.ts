import argon2  from "argon2";
import { IUserRepository } from "../../repositories";

export class LoginUserUseCase {
    constructor(private userRepository: IUserRepository) { }

    async execute(email: string, password: string) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }

        const isPasswordValid = await argon2.verify(user.password, password);
        console.log("isPasswordValid", isPasswordValid);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }
      

        return user;
    }
}