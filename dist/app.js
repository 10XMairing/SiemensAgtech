"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
require("reflect-metadata");
const loaders_1 = require("./loaders");
const winston_1 = require("./loaders/winston");
const app = express();
async function LoadDependencies(app) {
    await loaders_1.default(app);
    winston_1.default.info(" 💃 Finished loading dependencies 💃");
}
// for testing
async function default_1() {
    await LoadDependencies(app);
    return app;
}
exports.default = default_1;
//# sourceMappingURL=app.js.map