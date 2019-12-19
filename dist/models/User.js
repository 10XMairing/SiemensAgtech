"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config_1 = require("../config");
const UserSchema = new mongoose.Schema({
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
}, {
    timestamps: true
});
UserSchema.pre("save", function (next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified("password"))
        return next();
    // generate a salt
    bcrypt.genSalt(12, function (err, salt) {
        if (err)
            return next(err);
        // hash the password using our new salt
        bcrypt.hash(user["password"], salt, function (err, hash) {
            if (err)
                return next(err);
            // override the cleartext password with the hashed one
            user["password"] = hash;
            next();
        });
    });
});
UserSchema.methods.generateToken = function () {
    const token = jwt.sign({
        email: this.email,
        username: this.username,
        _id: this._id
    }, config_1.default.JWT_AUTH_USER);
    return token;
};
UserSchema.methods.comparePassword = function (comparePassword) {
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
exports.default = mongoose.model("User", UserSchema);
//# sourceMappingURL=User.js.map