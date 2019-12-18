import * as mongoose from "mongoose";

export interface IEquipmentModel {
  name: string;
  location: string;
  price: number;
  nStock: number;
  description: string;
  available: boolean;
  farmer: any;
}

export interface IEquipmentDoc extends mongoose.Document, IEquipmentModel {
  decrementStock: (num) => void;
  updateStock: (num) => void;
}

const EquipmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    nStock: { type: Number, default: 1 },
    available: { type: Boolean, default: true },
    description: { type: String, default: "" },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    farmer: { ref: "Farmer", type: mongoose.Schema.Types.ObjectId }
  },
  {
    timestamps: true
  }
);

// this methods do not work yet
EquipmentSchema.methods.updateStock = function(num: number) {
  this["nStock"] = num;
  return this;
};

EquipmentSchema.methods.decrementStock = function(num: number) {
  this["nStock"] -= num;

  return this;
};

export default mongoose.model<IEquipmentDoc>("Equipment", EquipmentSchema);
