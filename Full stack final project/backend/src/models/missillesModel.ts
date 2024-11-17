import mongoose, { Document } from "mongoose";

export interface IMissile extends Document {
   name: string;
   description: string;
   speed: number;
   intercepts: string[];
   price: number;
}

export interface IMissileModel extends mongoose.Model<IMissile> { }

const missileSchema = new mongoose.Schema({
   name: { type: String },
   description: { type: String },
   speed: { type: Number },
   intercepts: { type: [String], required: true },
   price: { type: Number },

});

export default mongoose.model<IMissile, IMissileModel>("Missile", missileSchema);