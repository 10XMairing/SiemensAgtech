"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const config_1 = require("../config");
async function default_1() {
    const env = process.env.NODE_ENV;
    let url;
    if (env == "production") {
        //   prod
        url = `mongodb://tenx:10xxpassword@ds141185.mlab.com:41185/agtech-db`;
    }
    else if (env == "development") {
        //   dev
        url = "mongodb://localhost:27017/node-agtech-dev";
    }
    else {
        //   local
        url = "mongodb://localhost:27017/node-temp-local";
    }
    const mongo = await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    });
    if (env == "development" && config_1.default.DB_MIGRAGE_OPTION == "drop") {
        // drop database
        console.log("Dropping database");
        await mongo.connection.dropDatabase();
        console.log("Database dropped");
    }
    return mongo;
}
exports.default = default_1;
//# sourceMappingURL=mongoose.js.map