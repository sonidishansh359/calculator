import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAdmin extends Document {
  username: string;
  password?: string; // Stored password (plain or hashed; we will store plain or a simple hash, but since user requested "password: admin", let's store it and support direct comparison)
  createdAt: Date;
  lastLoginAt?: Date;
}

const AdminSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  lastLoginAt: { type: Date },
});

// Avoid OverwriteModelError in Next.js development
const Admin: Model<IAdmin> = mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema);

export default Admin;
