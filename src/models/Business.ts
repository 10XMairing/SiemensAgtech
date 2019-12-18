import * as mongoose from "mongoose";
import * as bcrypt from "bcrypt";
import config from "../config";

export interface IBusinessModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  updatedAt: Date;
  createdAt: Date;
  
}

export interface IBusinessDoc extends IBusinessModel, mongoose.Document {}

const IBusinessSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

IBusinessSchema.pre("save", function(next) {
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

export default mongoose.model<IBusinessDoc>("Business", IBusinessSchema);
