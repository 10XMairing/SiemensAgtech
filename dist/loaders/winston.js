"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
const config_1 = require("../config");
const transports = [];
if (process.env.NODE_ENV != "development") {
    transports.push(new winston.transports.File({
        filename: process.env.NODE_ENV == "test"
            ? `${__dirname}/logger.test.log`
            : `${__dirname}/logger.log`,
        handleExceptions: true,
        level: "debug",
        maxsize: 5242880,
        maxFiles: 5
    }));
}
else {
    transports.push(new winston.transports.Console({
        format: winston.format.combine(winston.format.cli(), winston.format.splat(), winston.format.colorize(), winston.format.combine())
    }));
}
const LoggerInstance = winston.createLogger({
    level: config_1.default.logs.level,
    levels: winston.config.npm.levels,
    format: winston.format.combine(winston.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss"
    }), winston.format.errors({ stack: true }), winston.format.splat(), winston.format.json()),
    transports
});
exports.default = LoggerInstance;
//# sourceMappingURL=winston.js.map