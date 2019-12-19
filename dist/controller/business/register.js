"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Business_1 = require("../../models/Business");
const utils_1 = require("../../utils");
// inputs email , password
async function register(req, res, next) {
    try {
        const { email, password } = req.body;
        const business = new Business_1.default({
            email,
            password
        });
        const businessDoc = await business.save();
        let businessRecord = businessDoc.toObject();
        delete businessRecord.password;
        const token = await utils_1.generateToken({
            _id: businessDoc._id,
            email: businessDoc.email,
            type: "business"
        });
        return res.status(200).json({
            message: "Business registered",
            business: businessRecord,
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