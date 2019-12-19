"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Expert_1 = require("../../models/Expert");
// inputs email , password
async function getAll(req, res, next) {
    try {
        const experts = await Expert_1.default.find({}, { password: 0 });
        return res.status(200).json({
            total: experts.length,
            experts
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
        const expertDoc = await Expert_1.default.findOne({ _id }, { password: 0 });
        if (!expertDoc)
            return res.status(400).json({
                message: "Expert with given id doesnot exist",
                id: _id
            });
        return res.status(200).json(expertDoc);
    }
    catch (err) {
        req["status"] = 400;
        next(err);
    }
}
exports.getById = getById;
//# sourceMappingURL=get-experts.js.map