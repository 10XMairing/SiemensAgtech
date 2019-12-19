"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Order_1 = require("../../models/Order");
const Product_1 = require("../../models/Product");
const typedi_1 = require("typedi");
const logger = typedi_1.Container.get("logger");
// inputs email , password
async function create(req, res, next) {
    try {
        // user must be authenticted as farmer
        const farmer = req["userData"]._id;
        const { products } = req.body; //this will be a list of product ids
        if (products.length == 0)
            return res.status(400).json({
                message: "Products cannot be null",
                error: {
                    message: "missing key 'products'",
                    description: "array of product ids"
                }
            });
        const productDocs = await Product_1.default.find({ _id: { $in: products } });
        const orderRecord = new Order_1.default({
            products: productDocs,
            farmer
        });
        const order = await orderRecord.save();
        return res.status(200).json({
            message: "New Order created",
            farmer,
            order
        });
    }
    catch (err) {
        req["status"] = 400;
        next(err);
    }
}
exports.create = create;
//# sourceMappingURL=create.js.map