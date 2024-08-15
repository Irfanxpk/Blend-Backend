import { IUserRepository } from "../../application/repositories";
import { User } from "../../domain/entities";
import { UserModel } from "../models/UserModel";
import { CustomError } from "../../application/errors";
import { Logger } from "../../infrastructure/utils";

export class MongoUserRepository implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    try {
      const userData = await UserModel.findById(id);
      if (!userData) return null;
      return new User(
        userData.id,
        userData.name,
        userData.email,
        userData.password,
        userData.dob
      );
    } catch (error) {
      Logger.error("Error finding user by ID:", error);
      throw new CustomError("Error finding user by ID", 500);
    }
  }

  async find(): Promise<User[]> {
    try {
      const usersData = await UserModel.find();
      return usersData.map(
        (user) =>
          new User(user.id, user.name, user.email, user.password, user.dob,user.image, user.IsBlocked)
      );
    } catch (error) {
      Logger.error("Error finding users:", error);
      throw new CustomError("Error finding users",500);
    }
  }

  async save(user: User): Promise<User> {
    try {
      const newUser = await UserModel.create(user);
      return new User(
        newUser.id,
        newUser.name,
        newUser.email,
        newUser.password,
        newUser.dob
      );
    } catch (error) {
      Logger.error("Error saving user:", error);
      throw new CustomError("Error saving user", 500);
    }
  }

  async update(user: User): Promise<User> {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(user.id, user, {
        new: true,
      });
      if (!updatedUser) throw new CustomError("User not found",500);
      return new User(
        updatedUser.id,
        updatedUser.name,
        updatedUser.email,
        updatedUser.password,
        updatedUser.dob
      );
    } catch (error) {
      Logger.error("Error updating user:", error);
      throw new CustomError("Error updating user",500);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await UserModel.findByIdAndDelete(id);
    } catch (error) {
      Logger.error("Error deleting user:", error);
      throw new CustomError("Error deleting user", 500);
    }
  }

  async saveOTP(userId: string, otp: string, otpExpires: Date): Promise<void> {
    try {
      await UserModel.findByIdAndUpdate(userId, { otp, otpExpires });
    } catch (error) {
      Logger.error("Error saving OTP:", error);
      throw new CustomError("Error saving OTP",500);
    }
  }

  async verifyOTP(userId: string, otp: string): Promise<boolean> {
    try {
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
    } catch (error) {
      Logger.error("Error verifying OTP:", error);
      throw new CustomError("Error verifying OTP",500);
    }
  }

  async resetPassword(id: string, password: string): Promise<boolean> {
    try {
      const user = await UserModel.findById(id);

      if (user) {
        user.password = password;
        await user.save();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      Logger.error("Error resetting password:", error);
      throw new CustomError("Error resetting password",500);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await UserModel.findOne({ email });
      if (!user) return null;
      return new User(user.id, user.name, user.email, user.password, user.dob);
    } catch (error) {
      Logger.error("Error finding user by email:", error);
      throw new CustomError("Error finding user by email",500);
    }
  }

  async BlockUnblock(id: string): Promise<boolean> {
    try {
      const user = await UserModel.findById(id);
      if (!user) throw new CustomError("User not found",500);
      user.IsBlocked = !user.IsBlocked;
      await user.save();
      return user.IsBlocked;
    } catch (error) {
      Logger.error("Error blocking/unblocking user:", error);
      throw new CustomError("Error blocking/unblocking user",500);
    }
  }
}
