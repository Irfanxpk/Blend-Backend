// AdminModel.ts
import mongoose, { Schema, Document } from "mongoose";


interface IAdmin extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
}

const AdminSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export const AdminModel = mongoose.model<IAdmin>("Admin", AdminSchema);

