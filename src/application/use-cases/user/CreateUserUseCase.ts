import { User } from "../../../domain/entities";
import { IUserRepository } from "../../../application/repositories";
import {
  generateOTP,
  sendOTP,
  generateToken,
  hashPassword,
} from "../../../infrastructure/utils";

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  dob: Date;
}

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    input: CreateUserInput
  ): Promise<{ token: string; user: User; message: string }> {
    console.log("iam on createuserusecase")
    let hashedPassword = await hashPassword(input.password);
    const newUser = new User("", input.name, input.email, hashedPassword, input.dob);

    const savedUser = await this.userRepository.save(newUser);
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 15 * 60 * 1000); // OTP expires in 15 minutes
    await this.userRepository.saveOTP(savedUser.id, otp, otpExpires);

    const info = await sendOTP(savedUser.email, otp);

    console.log("info", info);
    
     const token = generateToken(savedUser.id);
      
     return { token, user: savedUser, message: "User created and OTP sent" };
  }
}
