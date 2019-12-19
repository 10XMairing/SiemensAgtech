"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    total: { type: Number },
    nStock: { type: Number, default: 1 },
    description: { type: String, required: true },
    discount: { type: Number, default: 0 },
    business: { ref: "Business", type: mongoose.Schema.Types.ObjectId }
}, {
    timestamps: true
});
ProductSchema.pre("save", function (next) {
    const doc = this;
    doc["total"] = doc["price"] - (doc["price"] * doc["discount"]) / 100;
    next();
});
exports.default = mongoose.model("Product", ProductSchema);
//# sourceMappingURL=Product.js.map