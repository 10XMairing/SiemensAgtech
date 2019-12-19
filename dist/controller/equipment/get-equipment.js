"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Equipment_1 = require("../../models/Equipment");
// inputs email , password
async function getAll(req, res, next) {
    try {
        const equipments = await Equipment_1.default.find();
        return res.status(200).json({
            total: equipments.length,
            equipments
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
        const doc = await Equipment_1.default.findOne({ _id });
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
async function getEquipmentsByFarmer(req, res, next) {
    try {
        const farmer = req["userData"]._id;
        const equipments = await Equipment_1.default.find({ farmer });
        return res.status(200).json({
            total: equipments.length,
            equipments
        });
    }
    catch (err) {
        req["status"] = 400;
        next(err);
    }
}
exports.getEquipmentsByFarmer = getEquipmentsByFarmer;
//# sourceMappingURL=get-equipment.js.map