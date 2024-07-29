import { User } from '../../domain/entities/User';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<any>;
  update(user: User): Promise<User>;
  delete(id: string): Promise<void>;
  saveOTP(userId: string, otp: string, otpExpires: Date): Promise<void>;
  verifyOTP(userId: string, otp: string): Promise<boolean>;
  findByEmail(email: string): Promise<User | null>;
  find(): Promise<{} | null>;
}