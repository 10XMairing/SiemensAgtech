"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EquipmentRequest_1 = require("../../models/EquipmentRequest");
// inputs email , password
async function getAll(req, res, next) {
    try {
        const requests = await EquipmentRequest_1.default.find();
        return res.status(200).json({
            total: requests.length,
            requests
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
        const doc = await EquipmentRequest_1.default.findOne({ _id });
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
async function getEquipmentsRequestedByFarmer(req, res, next) {
    try {
        const reqFarmer = req["userData"]._id;
        const requests = await EquipmentRequest_1.default.find({ reqFarmer });
        return res.status(200).json({
            message: "All requests made by farmer",
            farmer: reqFarmer,
            total: requests.length,
            requests,
        });
    }
    catch (err) {
        req["status"] = 400;
        next(err);
    }
}
exports.getEquipmentsRequestedByFarmer = getEquipmentsRequestedByFarmer;
//# sourceMappingURL=get-req.js.map