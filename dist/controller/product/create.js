"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = require("../../models/Product");
// inputs email , password
async function create(req, res, next) {
    try {
        // user must be authenticted as business
        const business = req["userData"]._id;
        const { name, price, description, discount } = req.body;
        const product = new Product_1.default({
            name,
            price,
            description,
            discount,
            business
        });
        const productRecord = await product.save();
        return res.status(200).json({
            message: "New Product added",
            business,
            product: productRecord
        });
    }
    catch (err) {
        req["status"] = 400;
        next(err);
    }
}
exports.create = create;
//# sourceMappingURL=create.js.map