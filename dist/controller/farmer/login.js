"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Farmer_1 = require("../../models/Farmer");
const utils_1 = require("../../utils");
const typedi_1 = require("typedi");
const logger = typedi_1.Container.get("logger");
// inputs email , password
async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const farmerRecord = await Farmer_1.default.findOne({ email });
        if (!farmerRecord)
            return res.status(400).json({
                message: `Farmer record does not exist with given email ${email}`,
                data: {
                    email
                }
            });
        // record exists match password
        logger.debug(email);
        logger.debug(password);
        logger.debug(farmerRecord);
        const isMatch = await utils_1.comparePassword(password, farmerRecord.password);
        logger.debug("password match status : %o", isMatch);
        if (!isMatch)
            return res.status(401).json({
                message: `Password do not match`,
                data: {
                    email,
                    id: farmerRecord._id
                }
            });
        else
            return res.status(200).json({
                message: "Authenticated",
                token: utils_1.generateToken({ _id: farmerRecord.id, email, type: "farmer" }),
                data: {
                    email
                }
            });
    }
    catch (err) {
        req["status"] = 400;
        next(err);
    }
}
exports.login = login;
//# sourceMappingURL=login.js.map