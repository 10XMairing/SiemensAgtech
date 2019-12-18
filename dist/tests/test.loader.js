"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
const mongoose_1 = require("../loaders/mongoose");
async function default_1() {
    const app = await app_1.default();
    const database = await mongoose_1.default();
    return { app, dbConn: database.connection };
}
exports.default = default_1;
//# sourceMappingURL=test.loader.js.map