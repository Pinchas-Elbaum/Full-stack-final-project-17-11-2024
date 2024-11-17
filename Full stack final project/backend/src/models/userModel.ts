import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
   id?: string;
   name: string;
   password: string;
   organization: string;
   area: string;
   budget: number;
   organizationId: string;
}

export interface IUserModel extends mongoose.Model<IUser> { }

const userSchema = new mongoose.Schema({
   name: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   organization: { type: String, required: true },
   area: { type: String },
   budget: { type: Number },
   organizationId: { type: String },
});

export default mongoose.model<IUser, IUserModel>("User", userSchema);