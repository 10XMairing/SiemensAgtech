import * as mongoose from "mongoose";
import * as bcrypt from "bcrypt";
import { Logger } from "winston";
import { Container } from "typedi";

const logger: Logger = Container.get("logger");

export interface ICropModel {
  name: string;
  description: string;
  expPrice: number;
  farmer: any;
}

export interface ICropDoc extends ICropModel, mongoose.Document {}

const CropSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, lowercase: true, trim: true },
    description: { type: String, default: "" },
    expPrice: { type: Number, required: true },
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer" }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<ICropDoc>("Crop", CropSchema);
