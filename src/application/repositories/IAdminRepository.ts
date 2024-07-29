import { Admin } from "../../domain/entities/Admin";


export interface IAdminRepository {
  create(admin: Admin): Promise<Admin>;
  getByEmail(email: string): Promise<Admin | null>;
  update(admin: Admin): Promise<Admin>;
  delete(id: string): Promise<void>;
 
}
