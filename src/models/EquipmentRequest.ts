import * as mongoose from "mongoose";
import EquipmentModel from "./Equipment";

export interface IEquipmentRequestModel {
  equipment: any;
  reqFarmer: any;
  accFarmer: any;
  dateRequired: Date;
  nDays: number;
  confirmStatus: boolean;
  paymentStatus: boolean;
  total: number;
  nQuantity: number;
}

export interface IEquipmentDoc
  extends mongoose.Document,
    IEquipmentRequestModel {}

const EquipmentRequestSchema = new mongoose.Schema(
  {
    equipment: {
      type: Object //stamp of equipment object
    },
    nQuantity: { type: Number, default: 1 },
    nDays: { type: Number, default: 1 }, //1 day by default
    reqFarmer: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer" },
    accFarmer: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer" },
    dateRequired: { type: Date },
    confirmStatus: { type: Boolean, default: false },
    paymentStatus: { type: Boolean, default: false },
    total: { type: Number }
  },
  {
    timestamps: true
  }
);

EquipmentRequestSchema.pre("save", async function(next) {
  var req = this;
  var equipment = req["equipment"]; //equipment id;
  const eqRecord = await EquipmentModel.findById(equipment);

  if (!eqRecord)
    next(new Error(`Equipment with id ${equipment} does not exist`));
  else {
    // save equiment stamp

    if (eqRecord.nStock < this["nQuantity"])
      next(new Error("Not enough equipment stock"));

    this["equipment"] = eqRecord;
    this["total"] = eqRecord.price * this["nQuantity"] * this["nDays"];
    this["accFarmer"] = eqRecord.farmer;

    next();
  }
});

export default mongoose.model<IEquipmentDoc>(
  "EquipmentRequest",
  EquipmentRequestSchema
);
