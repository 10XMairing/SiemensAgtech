"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const ProductCart_1 = require("./ProductCart");
const typedi_1 = require("typedi");
const logger = typedi_1.Container.get("logger");
const FarmerSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    productCart: {
        ref: "ProductCart",
        unique: true,
        type: mongoose.Schema.Types.ObjectId
    }
}, {
    timestamps: true
});
FarmerSchema.pre("save", function (next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified("password"))
        return next();
    // generate a salt
    bcrypt.genSalt(12, function (err, salt) {
        if (err)
            return next(err);
        // hash the password using our new salt
        bcrypt.hash(user["password"], salt, async function (err, hash) {
            if (err)
                return next(err);
            // override the cleartext password with the hashed one
            user["password"] = hash;
            const cart = await new ProductCart_1.default({ farmer: user["_id"] }).save();
            user["productCart"] = cart._id;
            logger.debug("cart created");
            next();
        });
    });
});
FarmerSchema.methods.getFullname = function () {
    const farmer = this;
    return `${farmer["firstName"]} ${farmer["lastname"]}`;
};
exports.default = mongoose.model("Farmer", FarmerSchema);
//# sourceMappingURL=Farmer.js.map