"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Farmer_1 = require("../../models/Farmer");
const utils_1 = require("../../utils");
// inputs email , password
async function register(req, res, next) {
    try {
        const { email, password } = req.body;
        const farmer = new Farmer_1.default({
            email,
            password
        });
        const farmerDoc = await farmer.save();
        let farmerRecord = farmerDoc.toObject();
        delete farmerRecord.password;
        // generate token
        const token = await utils_1.generateToken({
            _id: farmerDoc._id,
            email: farmerDoc.email,
            type: "farmer"
        });
        return res.status(200).json({
            message: "Farmer registered",
            farmer: farmerRecord,
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