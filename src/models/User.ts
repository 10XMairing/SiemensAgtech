import * as mongoose from "mongoose";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

import config from "../config";
import { IUserModel } from "../interface/IUser";

interface IUserDoc extends IUserModel, mongoose.Document {
  generateToken: () => string;
  comparePassword: (password) => Promise<boolean>;
}

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter full name"],
      index: true
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true
    },
    address: {
      type: String,
      default: ""
    },
    pin: {
      type: Number,
      default: -1
    },
    phone: {
      type: Number,
      default: -1
    },
    password: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

UserSchema.pre("save", function(next) {
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

UserSchema.methods.generateToken = function() {
  const token = jwt.sign(
    {
      email: this.email,
      username: this.username,
      _id: this._id
    },
    config.JWT_AUTH_USER
  );

  return token;
};

UserSchema.methods.comparePassword = function(comparePassword) {
  return new Promise((resolve, reject) => {
    bcrypt
      .compare(comparePassword, this.password)
      .then(isMatch => {
        resolve(isMatch);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default mongoose.model<IUserDoc>("User", UserSchema);
