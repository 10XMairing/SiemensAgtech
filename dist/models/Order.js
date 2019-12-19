"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const typedi_1 = require("typedi");
const Product_1 = require("./Product");
const logger = typedi_1.Container.get("logger");
// product -- > {name,price,description,discount}
const OrderSchema = new mongoose.Schema({
    total: { type: Number },
    deliveryAddress: { type: String },
    paymentAddress: { type: String },
    completed: { type: Boolean, default: false },
    discountTotal: { type: Number },
    orderTotal: { type: Number },
    products: [
        {
            completed: { type: Boolean, default: false },
            quantity: { type: Number, default: 1 },
            business: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Business",
                required: true
            },
            stamp: { type: Object }
        }
    ],
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer" }
}, {
    timestamps: true
});
//orderTotal & discount total will be calculated automatically
OrderSchema.pre("save", async function (next) {
    var Order = this;
    let total = 0.0;
    let discountTotal = 0.0;
    let orderTotal = 0.0;
    const products = Order["products"]; //list of product ids
    const productDocs = await Product_1.default.find({ _id: { $in: products } });
    let modifiedProducts = [];
    logger.debug("docs : %o", productDocs);
    productDocs.forEach(data => {
        const price = data.price * 1.0; //number
        const discount = data.discount * 1.0; //number%
        modifiedProducts.push({
            business: data.business,
            stamp: data
        });
        total += price;
        const prodDiscount = (discount * price) / 100;
        discountTotal += prodDiscount;
    });
    orderTotal = total - discountTotal;
    Order["total"] = total;
    Order["discountTotal"] = discountTotal;
    Order["orderTotal"] = orderTotal;
    Order["products"] = modifiedProducts;
    next();
});
OrderSchema.post("updateOne", function (doc, next) {
    // after every update check complete status of each product
    // if all product status is "true" , set the order complete status to true
    const products = doc["products"];
    products.array.forEach(item => {
        if (!item.completed) {
            next();
        }
    });
    // all completed
    doc["completed"] = true;
    next();
});
exports.default = mongoose.model("Order", OrderSchema);
//# sourceMappingURL=Order.js.map