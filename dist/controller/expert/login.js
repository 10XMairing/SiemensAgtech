"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Expert_1 = require("../../models/Expert");
const utils_1 = require("../../utils");
// inputs email , password
async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const expertRecord = await Expert_1.default.findOne({ email });
        if (!expertRecord)
            return res.status(400).json({
                message: `Expert record does not exist with given email ${email}`,
                data: {
                    email,
                    id: expertRecord._id
                }
            });
        // record exists match password
        const isMatch = await utils_1.comparePassword(password, expertRecord.password);
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
                token: utils_1.generateToken({ _id: expertRecord.id, email, type: "expert" }),
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