import mongoose, { Document } from "mongoose";

export interface IOrganization extends Document {
    name: string;
    resources: { name: string; amount: number }[];
    budget: number;
}

export interface IOrganizationModel extends mongoose.Model<IOrganization> { }

const organizationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    resources: { type: [{ name: String, amount: Number }], required: true },
    budget: { type: Number, required: true },
});

export default mongoose.model<IOrganization, IOrganizationModel>("Organization", organizationSchema);