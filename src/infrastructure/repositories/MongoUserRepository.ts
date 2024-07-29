import { IUserRepository } from "../../application/repositories";
import { User } from "../../domain/entities";
import { UserModel } from "../models/UserModel";

export class MongoUserRepository implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    const userData = await UserModel.findById(id);
    if (!userData) return null;
    return new User(
      userData.id,
      userData.name,
      userData.email,
      userData.password,
      userData.dob
    );
  }

  async find(): Promise<{} | null> {
    const userData = await UserModel.find();
    if (!userData) return null;
    return userData
  }
  async save(user: User): Promise<User> {
    const newUser = await UserModel.create(user);
    return new User(
      newUser.id,
      newUser.name,
      newUser.email,
      newUser.password,
      newUser.dob
    );
  }

  async update(user: User): Promise<User> {
    const updatedUser = await UserModel.findByIdAndUpdate(user.id, user, {
      new: true,
    });
    if (!updatedUser) throw new Error("User not found");
    return new User(
      updatedUser.id,
      updatedUser.name,
      updatedUser.email,
      updatedUser.password,
      updatedUser.dob
    );
  }

  async delete(id: string): Promise<void> {
    await UserModel.findByIdAndDelete(id);
  }

  async saveOTP(userId: string, otp: string, otpExpires: Date): Promise<void> {
    await UserModel.findByIdAndUpdate(userId, { otp, otpExpires });
  }

  async verifyOTP(userId: string, otp: string): Promise<boolean> {
    const user = await UserModel.findById(userId);
    
    if (user && user.otp === otp && user.otpExpires > new Date()) {
      await UserModel.findByIdAndUpdate(userId, {
        otp: null,
        otpExpires: null,
        IsVerified: true,
      });
      return true;
    }
    return false;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email });
    if (!user) return null;
    return new User(
      user.id,
      user.name,
      user.email,
      user.password,
      user.dob
    );
  }
}