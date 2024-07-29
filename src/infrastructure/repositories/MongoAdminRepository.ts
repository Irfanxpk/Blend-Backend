import { AdminModel } from "../models/AdminModel";
import { Admin } from "../../domain/entities";
import { IAdminRepository } from "../../application/repositories";

export class MongoAdminRepository implements IAdminRepository {
  async create(admin: Admin): Promise<Admin > {
    const adminDoc = new AdminModel({
      name: admin.name,
      email: admin.email,
      password: admin.password,
    });
    const savedAdmin = await adminDoc.save();
    return new Admin(
      savedAdmin._id.toString(),
      savedAdmin.name,
      savedAdmin.email,
      savedAdmin.password
    );
  }

  async getByEmail(email: string ): Promise<Admin | null> {
    const adminDoc = await AdminModel.findOne({ email: email });
    if (!adminDoc) return null;
    return new Admin(
      adminDoc._id.toString(),
      adminDoc.name,
      adminDoc.email,
      adminDoc.password
    );
  }

  async update(admin: Admin): Promise<Admin> {
    const updatedAdminDoc = await AdminModel.findByIdAndUpdate(
      admin.id,
      {
        name: admin.name,
        email: admin.email,
        password: admin.password,
      },
      { new: true }
    );

    if (!updatedAdminDoc) throw new Error("Admin not found");

    return new Admin(
      updatedAdminDoc._id.toString(),
      updatedAdminDoc.name,
      updatedAdminDoc.email,
      updatedAdminDoc.password
    );
  }

  async delete(id: string): Promise<void> {
    await AdminModel.findByIdAndDelete(id);
  }
}
