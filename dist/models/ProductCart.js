"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const typedi_1 = require("typedi");
const Product_1 = require("./Product");
const logger = typedi_1.Container.get("logger");
const IProductCartSchema = new mongoose.Schema({
    total: { type: Number },
    deliveryAddress: { type: String },
    paymentAddress: { type: String },
    completed: { type: Boolean, default: false },
    discountTotal: { type: Number },
    cartTotal: { type: Number },
    products: [
        {
            quantity: { type: Number, default: 1 },
            id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }
        }
    ],
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Farmer",
        unique: true,
        required: true
    }
}, {
    timestamps: true
});
IProductCartSchema.pre("save", async function (done) {
    const products = this["products"];
    let total = 0.0;
    let discountTotal = 0.0;
    let cartTotal = 0.0;
    for (var i = 0; i < products.length; i++) {
        const item = products[i];
        const prodRecord = await Product_1.default.findById(item.id);
        total += prodRecord.price * item.quantity;
        discountTotal +=
            (prodRecord.discount * prodRecord.price * item.quantity) / 100;
    }
    cartTotal = total - discountTotal;
    console.log(cartTotal);
    this["total"] = total;
    this["discountTotal"] = discountTotal;
    this["cartTotal"] = cartTotal;
    done();
});
// IProductCartSchema.methods.addProduct = function(prods: {
//   quantity: number;
//   id: string;
// }) {
//   this["products"].push(prods);
// };
IProductCartSchema.methods.create = function (prods, deliveryAddress, paymentAddress) {
    this["products"] = prods;
    this["deliveryAddress"] = deliveryAddress;
    this["paymentAddress"] = paymentAddress;
    return this;
};
exports.default = mongoose.model("ProductCart", IProductCartSchema);
//# sourceMappingURL=ProductCart.js.map