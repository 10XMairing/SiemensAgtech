"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("./express");
const mongoose_1 = require("./mongoose");
const winston_1 = require("./winston");
const typedi_1 = require("typedi");
async function default_1(app) {
    typedi_1.Container.set("logger", winston_1.default);
    winston_1.default.info("Logger set to DI Container");
    await express_1.default(app);
    winston_1.default.info("express loaded");
    await mongoose_1.default();
    winston_1.default.info("mongoose loaded");
}
exports.default = default_1;
//# sourceMappingURL=index.js.map