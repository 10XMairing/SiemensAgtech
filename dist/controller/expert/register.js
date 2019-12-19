"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Expert_1 = require("../../models/Expert");
const utils_1 = require("../../utils");
// inputs email , password
async function register(req, res, next) {
    try {
        const { email, password } = req.body;
        const expert = new Expert_1.default({
            email,
            password
        });
        const expertDoc = await expert.save();
        let expertRecord = expertDoc.toObject();
        delete expertRecord.password;
        const token = await utils_1.generateToken({
            _id: expertDoc._id,
            email: expertDoc.email,
            type: "expert"
        });
        return res.status(200).json({
            message: "Expert registered",
            expert: expertRecord,
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