"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const config_1 = require("../config");
function generateToken(data) {
    const type = data.type;
    if (type == "farmer" ||
        type == "expert" ||
        type == "business" ||
        type == "distributor") {
        let secret = "";
        if (type == "farmer")
            secret = config_1.default.JWT_AUTH_FARMER;
        else if (type == "expert")
            secret = config_1.default.JWT_AUTH_EXPERT;
        else if (type == "distributor")
            secret = config_1.default.JWT_AUTH_DISTRIBUTOR;
        else
            secret = config_1.default.JWT_AUTH_BUSINESS; //last business
        const token = jwt.sign(data, secret);
        return token;
    }
    else {
        throw new Error("Type must be 'farmer' , 'expert', 'distributor' or 'business'");
    }
}
exports.generateToken = generateToken;
//# sourceMappingURL=generate-token.js.map