"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Order_1 = require("../../models/Order");
// inputs email , password
async function getAll(req, res, next) {
    try {
        const orders = await Order_1.default.find();
        return res.status(200).json({
            total: orders.length,
            orders
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
        const doc = await Order_1.default.findOne({ _id });
        if (!doc)
            return res.status(400).json({
                message: "Order with given id doesnot exist",
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
async function getOrdersForFarmer(req, res, next) {
    try {
        // farmer auth required
        const farmer = req["userData"]._id;
        const orders = await Order_1.default.find({ farmer });
        return res.status(200).json({
            message: "All orders for farmer",
            total: orders.length,
            orders,
            farmer
        });
    }
    catch (err) {
        req["status"] = 400;
        next(err);
    }
}
exports.getOrdersForFarmer = getOrdersForFarmer;
async function getOrdersForBusiness(req, res, next) {
    try {
        // business auth required
        const business = req["userData"]._id;
        const orders = await Order_1.default.find();
        return res.status(200).json({
            message: "All orders for business - This route is not accurate!",
            total: orders.length,
            orders,
            business
        });
    }
    catch (err) {
        req["status"] = 400;
        next(err);
    }
}
exports.getOrdersForBusiness = getOrdersForBusiness;
//# sourceMappingURL=get-orders.js.map