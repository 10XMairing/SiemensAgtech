import * as mongoose from "mongoose";
import { Logger } from "winston";
import { Container } from "typedi";
import ProductModel from "./Product";

const logger: Logger = Container.get("logger");

export interface IDistRequestModel {
  cropName: string; //potato tomato aalu paalu
  description: string;
  expectedPriceTotal: number; //price of total expected produce
  expectedProduce: number; //in kgs
  location: string;
  rate: number; //expPrice/expProduc   rs/kg
  farmer: any; //farmer ref
  distributor: any; //distributor ref
  paymentStatus: boolean;
  confirmStatus: boolean;
  price: number; //cost for storage and transport // should come from distributors base price
}

export interface IDistRequestDoc extends mongoose.Document, IDistRequestModel {}

const DistRequestSchema = new mongoose.Schema(
  {
    cropName: { type: String, required: true, lowercase: true, trim: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    expectedPriceTotal: { type: Number, required: true },
    expectedProduce: { type: Number, required: true },
    rate: { type: Number },
    price: { type: Number },
    paymentStatus: { type: Boolean, default: false },
    confirmStatus: { type: Boolean, default: false },
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer" },
    distributor: { type: mongoose.Schema.Types.ObjectId, ref: "Distributor" }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IDistRequestDoc>(
  "DistributionRequest",
  DistRequestSchema
);
