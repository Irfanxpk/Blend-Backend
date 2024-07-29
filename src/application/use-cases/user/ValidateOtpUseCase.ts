import { IUserRepository } from "../../repositories";

export class ValidateOtpUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: string, otp: string , id: string) {
    const user = await this.userRepository.findById(id);
    // console.log("user", user);
    
    if (!user) {
      throw new Error("User not found");
    }

    const isOtpValid = await this.userRepository.verifyOTP(user.id, otp);
    console.log("isOtpValid", isOtpValid);
    if (!isOtpValid) {
      // throw new Error("Invalid or expired OTP");
      return null
    }

    return user;
  }
}
