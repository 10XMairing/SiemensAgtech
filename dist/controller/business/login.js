"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Business_1 = require("../../models/Business");
const utils_1 = require("../../utils");
// inputs email , password
async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const businessRecord = await Business_1.default.findOne({ email });
        if (!businessRecord)
            return res.status(400).json({
                message: `Business record does not exist with given email ${email}`,
                data: {
                    email,
                    id: businessRecord._id
                }
            });
        // record exists match password
        const isMatch = await utils_1.comparePassword(password, businessRecord.password);
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
                    _id: businessRecord.id,
                    email,
                    type: "business"
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