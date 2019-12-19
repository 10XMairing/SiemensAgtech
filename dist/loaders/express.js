"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser = require("body-parser");
const celebrate_1 = require("celebrate");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
// routes
function default_1(app) {
    app.use(parser.json());
    app.use(parser.urlencoded({
        extended: false
    }));
    // cors
    app.use(cors());
    app.use(morgan("combined"));
    // load router
    app.use("/uploads", express.static("uploads"));
    //   load router
    require("../api/v1").default(app);
    app.get("/", (req, res, next) => {
        return res.status(200).json({
            message: "Hello Agtech api server! Lets Start!"
        });
    });
    app.use(celebrate_1.errors());
    //  load routes
    // error handlers
    app.use((req, res, next) => {
        const err = new Error("Not found");
        err["status"] = 404;
        next(err);
    });
    app.use((err, req, res, next) => {
        /**
         * Handle 401 thrown by express-jwt library
         */
        if (err.name === "UnauthorizedError") {
            return res
                .status(err.status)
                .send({ message: err.message })
                .end();
        }
        return next(err);
    });
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        // return joi errors with a 404
        if (err.joi) {
            res.status(400);
            return res.json({
                message: err.joi.details[0].message || "Error"
            });
        }
        res.json({
            message: err.message,
            error: err
        });
    });
}
exports.default = default_1;
//# sourceMappingURL=express.js.map