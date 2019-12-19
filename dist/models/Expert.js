"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const ExpertSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {
    timestamps: true
});
ExpertSchema.pre("save", function (next) {
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
exports.default = mongoose.model("Expert", ExpertSchema);
//# sourceMappingURL=Expert.js.map