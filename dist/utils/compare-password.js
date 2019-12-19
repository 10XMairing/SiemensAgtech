"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
async function comparePassword(passwod, hash) {
    try {
        const isMatch = await bcrypt.compare(passwod, hash);
        return isMatch;
    }
    catch (err) {
        throw err;
    }
}
exports.comparePassword = comparePassword;
//# sourceMappingURL=compare-password.js.map