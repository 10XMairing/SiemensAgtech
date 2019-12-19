"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const config_1 = require("../config");
function checkDistributor(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        let decoded = jwt.verify(token, config_1.default.JWT_AUTH_DISTRIBUTOR);
        req.userData = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({
            message: "Distributor unauthorized"
        });
    }
}
exports.checkDistributor = checkDistributor;
//# sourceMappingURL=check-distributor.js.map