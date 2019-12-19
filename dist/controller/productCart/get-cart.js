"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProductCart_1 = require("../../models/ProductCart");
async function getAll(req, res, next) {
    try {
        const carts = await ProductCart_1.default.find();
        return res.status(200).json({
            message: "required for test only",
            total: carts.length,
            carts
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
        const doc = await ProductCart_1.default.findOne({ _id });
        if (!doc)
            return res.status(400).json({
                message: "Cart with given id doesnot exist",
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
async function getProductCartByFarmerToken(req, res, next) {
    try {
        //   must have business auth
        const farmer = req["userData"]._id;
        const cart = await ProductCart_1.default.findById(farmer);
        return res.status(200).json({
            farmer,
            cart
        });
    }
    catch (err) {
        req["status"] = 400;
        next(err);
    }
}
exports.getProductCartByFarmerToken = getProductCartByFarmerToken;
//# sourceMappingURL=get-cart.js.map