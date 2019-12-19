import * as mongoose from "mongoose";
import * as bcrypt from "bcrypt";
import config from "../config";

export interface IAppointmentModel {
  expert: JSON;
  farmer: JSON;
  price: number;
  location: string;
  description: string;
  date: Date;
  confirmStatus: boolean;
}

export interface IAppointmentDoc extends IAppointmentModel, mongoose.Document {}

const IAppointmentSchema = new mongoose.Schema(
  {
    expert: { type: mongoose.Schema.Types.ObjectId, ref: "Expert" },
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer" },
    price: { type: Number, required: true },
    date: { type: Date, required: true },
    description: { type: String, default: "" },
    location: { type: String, required: true },
    confirmStatus: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IAppointmentDoc>(
  "Appointment",
  IAppointmentSchema
);
