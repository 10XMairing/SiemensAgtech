"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const config_1 = require("../config");
function checkFarmer(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        let decoded = jwt.verify(token, config_1.default.JWT_AUTH_FARMER);
        req.userData = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({
            message: "Farmer unauthorized"
        });
    }
}
exports.checkFarmer = checkFarmer;
//# sourceMappingURL=check-farmer.js.map