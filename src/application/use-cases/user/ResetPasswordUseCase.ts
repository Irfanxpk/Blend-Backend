import {  hashPassword, verifyToken } from "../../../infrastructure";
import { IUserRepository } from "../../repositories";



export class ResetPasswordUseCase {
    constructor(private userRepository: IUserRepository) { }
    
    async execute(token: string, password: string) {
        const decoded = verifyToken(token);
        console.log("decoded", decoded);

        if (typeof decoded === "object" && "userId" in decoded) { 
            const user = await this.userRepository.findById(decoded.userId as string);
            if (!user) {
                return { message: "User not found", success: false };
            }
               const hashedPassword = await hashPassword(password);
            await this.userRepository.resetPassword(user.id, hashedPassword);
        }
        

            return { message: "Password reset successful", success: true };
        
    }
}
