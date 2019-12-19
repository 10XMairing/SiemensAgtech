"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Distributor_1 = require("../../models/Distributor");
const utils_1 = require("../../utils");
// inputs email , password
async function register(req, res, next) {
    try {
        const { email, password } = req.body;
        const distributor = new Distributor_1.default({
            email,
            password
        });
        const distributorDoc = await distributor.save();
        let distRecord = distributorDoc.toObject();
        delete distRecord.password;
        // generate token
        const token = await utils_1.generateToken({
            _id: distributorDoc._id,
            email: distributorDoc.email,
            type: "distributor"
        });
        return res.status(200).json({
            message: "distributor registered",
            user: distRecord,
            token
        });
    }
    catch (err) {
        req["status"] = 400;
        next(err);
    }
}
exports.register = register;
//# sourceMappingURL=register.js.map