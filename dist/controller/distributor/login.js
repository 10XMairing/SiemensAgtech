"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Distributor_1 = require("../../models/Distributor");
const utils_1 = require("../../utils");
const typedi_1 = require("typedi");
const logger = typedi_1.Container.get("logger");
// inputs email , password
async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const distRecord = await Distributor_1.default.findOne({ email });
        if (!distRecord)
            return res.status(400).json({
                message: `Distributor record does not exist with given email ${email}`,
                data: {
                    email,
                    id: distRecord._id
                }
            });
        const isMatch = await utils_1.comparePassword(password, distRecord.password);
        if (!isMatch)
            return res.status(401).json({
                message: `Password do not match`,
                data: {
                    email
                }
            });
        else
            return res.status(200).json({
                message: "Authenticated",
                token: utils_1.generateToken({
                    _id: distRecord.id,
                    email,
                    type: "distributor"
                }),
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