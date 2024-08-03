import { generateToken, sendResetPasswordEmail } from "../../../infrastructure";
import { IUserRepository } from "../../repositories";


export class ForgetPasswordUseCase{
    constructor(private userRepository: IUserRepository) { }
    
    async execute(email: string) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            return {message: "User not found" ,  success: false};
            // throw new Error("User not found");
        }

        const token =  generateToken(user.id);
        await sendResetPasswordEmail(user.email, token, user.name);
        
            
        
        return {message: "Password reset link sent to your email" ,  success: true};
    }
}