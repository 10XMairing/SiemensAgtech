"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Business_1 = require("../../models/Business");
// inputs email , password
async function getAll(req, res, next) {
    try {
        const businesses = await Business_1.default.find({}, { password: 0 });
        return res.status(200).json({
            total: businesses.length,
            businesses
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
        const businessDoc = await Business_1.default.findOne({ _id }, { password: 0 });
        if (!businessDoc)
            return res.status(400).json({
                message: "Business with given id doesnot exist",
                id: _id
            });
        return res.status(200).json(businessDoc);
    }
    catch (err) {
        req["status"] = 400;
        next(err);
    }
}
exports.getById = getById;
//# sourceMappingURL=get-business.js.map