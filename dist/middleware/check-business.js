"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const config_1 = require("../config");
function checkBusiness(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        let decoded = jwt.verify(token, config_1.default.JWT_AUTH_BUSINESS);
        req.userData = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({
            message: "Business unauthorized"
        });
    }
}
exports.checkBusiness = checkBusiness;
//# sourceMappingURL=check-business.js.map