"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Farmer_1 = require("../../models/Farmer");
// inputs email , password
async function getAll(req, res, next) {
    try {
        const farmers = await Farmer_1.default.find({}, { password: 0 });
        return res.status(200).json({
            total: farmers.length,
            farmers
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
        const doc = await Farmer_1.default.findOne({ _id }, { password: 0 });
        if (!doc)
            return res.status(400).json({
                message: "Farmer with given id doesnot exist",
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
//# sourceMappingURL=get-farmers.js.map