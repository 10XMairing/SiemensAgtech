import * as mongoose from "mongoose";
import { Logger } from "winston";
import { Container } from "typedi";
import ProductModel from "./Product";

import prices from "../data/prices";

const logger: Logger = Container.get("logger");

export interface IDistRequestModel {
  cropName: string; //potato tomato aalu paalu
  description: string;
  location: string;
  rate: number;
  distCost: number;
  total: number;
  farmerRevenue: number;
  farmer: any; //farmer ref
  paymentStatus: boolean;
  confirmStatus: boolean;
}

export interface IDistRequestDoc extends mongoose.Document, IDistRequestModel {}

const DistRequestSchema = new mongoose.Schema(
  {
    cropName: { type: String, required: true, lowercase: true, trim: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    quantity: { type: Number, required: true },
    total: { type: Number },
    rate: { type: Number },
    farmerRevenue: { type: Number },
    distCost: { type: Number },
    paymentStatus: { type: Boolean, default: false },
    confirmStatus: { type: Boolean, default: false },
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer" }
  },
  {
    timestamps: true
  }
);

DistRequestSchema.pre("save", function(next) {
  const request = this;
  const name = request["cropName"];
  const quantity = request["quantity"];

  if (!prices.hasOwnProperty(name))
    next(
      new Error(
        "The Distributor doest not currently accept this crop type . go to api/crop/prices for details"
      )
    );
  else {
    const price = prices[name];
    request["total"] = quantity * price;
    request["rate"] = price;
    request["distCost"] = 0.2 * request["total"]; //20 % of market price
    request["farmerRevenue"] = request["total"] - request["distCost"];
    next();
  }
});

export default mongoose.model<IDistRequestDoc>(
  "DistributionRequest",
  DistRequestSchema
);
