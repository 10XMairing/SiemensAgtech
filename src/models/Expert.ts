import * as mongoose from "mongoose";
import * as bcrypt from "bcrypt";
import config from "../config";

export interface IExpertModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  profileImage: string;
  bio: string;
  location: string;

  token: string;

  expertise: string;
  basePrice: number;
  qualification: string;

  updatedAt: Date;
  createdAt: Date;
}

export interface IExpertDoc extends IExpertModel, mongoose.Document {}

const ExpertSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    token: { type: String },
    email: { type: String, required: true, unique: true },
    bio: { type: String, default: "" },
    expertise: { type: String, default: "" },
    basePrice: { type: String, default: "" },
    qualification: { type: String, default: "" },
    profileImage: { type: String, default: "" },
    location: { type: String, default: "" },
    password: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

ExpertSchema.pre("save", function(next) {
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

export default mongoose.model<IExpertDoc>("Expert", ExpertSchema);
