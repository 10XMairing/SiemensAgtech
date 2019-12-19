import * as mongoose from "mongoose";
import * as bcrypt from "bcrypt";
import config from "../config";
import ProductCart from "./ProductCart";
import { Logger } from "winston";
import { Container } from "typedi";

const logger: Logger = Container.get("logger");

export interface IFarmerModel {
  firstName: string;
  lastName: string;

  email: string;
  password: string;
  profileImage: string;
  bio: string;
  location: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface IFarmerDoc extends IFarmerModel, mongoose.Document {
  getFullname: () => string;
  fullname: string;
}

const FarmerSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    bio: { type: String },
    profileImage: { type: String },
    location: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

FarmerSchema.pre("save", function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(12, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user["password"], salt, async function(err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user["password"] = hash;
      next();
    });
  });
});

FarmerSchema.methods.getFullname = function() {
  const farmer = this;
  return `${farmer["firstName"]} ${farmer["lastname"]}`;
};

export default mongoose.model<IFarmerDoc>("Farmer", FarmerSchema);
