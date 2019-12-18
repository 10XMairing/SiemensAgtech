"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
app.get("/", (req, res, next) => {
    return res.status(200).json({
        message: "Hello World!"
    });
});
exports.default = app;
//# sourceMappingURL=demo.js.map