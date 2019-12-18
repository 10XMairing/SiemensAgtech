"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
async function default_1() {
    const env = process.env.NODE_ENV;
    let url;
    if (env == "production") {
        //   prod
        url = "mongodb://localhost:27017/node-temp-prod";
    }
    else if (env == "development") {
        //   dev
        url = "mongodb://localhost:27017/node-temp-dev";
    }
    else {
        //   test
        url = "mongodb://localhost:27017/node-temp-test";
    }
    return await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    });
}
exports.default = default_1;
//# sourceMappingURL=mongoose.js.map