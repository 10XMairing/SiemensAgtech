"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Distributor_1 = require("../../models/Distributor");
const typedi_1 = require("typedi");
// inputs email , password
const logger = typedi_1.Container.get("logger");
async function getAll(req, res, next) {
    try {
        const distributors = await Distributor_1.default.find({}, { password: 0 });
        return res.status(200).json({
            total: distributors.length,
            distributors
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
        logger.debug("dist id : %o", _id);
        const doc = await Distributor_1.default.findOne({ _id }, { password: 0 });
        if (!doc)
            return res.status(400).json({
                message: "Distributor with given id doesnot exist",
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
async function getUserByToken(req, res, next) {
    try {
        // requires auth
        const _id = req["userData"]._id;
        logger.debug("dist id : %o", _id);
        const doc = await Distributor_1.default.findOne({ _id }, { password: 0 });
        if (!doc)
            return res.status(400).json({
                message: "Distributor with given id doesnot exist",
                id: _id
            });
        return res.status(200).json(doc);
    }
    catch (err) {
        req["status"] = 400;
        next(err);
    }
}
exports.getUserByToken = getUserByToken;
//# sourceMappingURL=get-user.js.map