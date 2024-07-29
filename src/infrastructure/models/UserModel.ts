import mongoose, { Schema, Document } from "mongoose";
import { IsNull } from "typeorm";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  dob : Date;
  image: string;
  otp: string;
  otpExpires: Date;
  IsVerified: boolean;
  IsBlocked: boolean;
  
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
  image: {
    type: String,
    required: false,
    default:
      "https://static.vecteezy.com/system/resources/thumbnails/027/312/306/small/portrait-of-a-dj-with-headphone-isolated-essential-workers-avatar-icons-characters-for-social-media-and-networking-user-profile-website-and-app-3d-render-illustration-png.png",
  },
  otp: { type: String, required: false },
  otpExpires: { type: Date, required: false },
  IsVerified: { type: Boolean, required: false, default: false },
  IsBlocked: { type: Boolean, required: false, default: false },
},{timestamps: true,});

export const UserModel = mongoose.model<IUser>("User", UserSchema);
