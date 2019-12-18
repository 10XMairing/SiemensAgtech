import * as mongoose from "mongoose";
import * as bcrypt from "bcrypt";
import config from "../config";

export interface IDistributorModel {
  firstName: string;
  lastName: string;
  businessName: string;
  storageCapacity: number;
  acceptedCrops: string[];
  baseRate: number; // rs per day per 1000kg,
  isAvailable: boolean;
  email: string;
  phone: string;
  password: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface IDistributorDoc extends IDistributorModel, mongoose.Document {}

const DistributorSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    businessName: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
    acceptedCrops: [
      {
        name: { type: String, required: true, lowercase: true },
        rate: {
          type: Number,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

DistributorSchema.pre("save", function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(12, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user["password"], salt, function(err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user["password"] = hash;
      next();
    });
  });
});

export default mongoose.model<IDistributorDoc>(
  "Distributor",
  DistributorSchema
);
