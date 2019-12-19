"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = require("../../models/Product");
// inputs email , password
async function getAll(req, res, next) {
    try {
        const products = await Product_1.default.find();
        return res.status(200).json({
            total: products.length,
            products
        });
    }
    catch (err) {
        req["status"] = 400;
        next(err);
    }
}
exports.getAll = getAll;
async function getById(req, res, next) {
    try {
        const _id = req.params.id;
        const doc = await Product_1.default.findOne({ _id });
        if (!doc)
            return res.status(400).json({
                message: "Product with given id doesnot exist",
                id: _id
            });
        return res.status(200).json(doc);
    }
    catch (err) {
        req["status"] = 400;
        next(err);
    }
}
exports.getById = getById;
async function getProductsForBusiness(req, res, next) {
    try {
        //   must have business auth
        const business = req["userData"]._id;
        const products = await Product_1.default.find({ business });
        return res.status(200).json({
            total: products.length,
            products,
            business
        });
    }
    catch (err) {
        req["status"] = 400;
        next(err);
    }
}
exports.getProductsForBusiness = getProductsForBusiness;
//# sourceMappingURL=get.js.map