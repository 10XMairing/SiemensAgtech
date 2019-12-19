"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const farmer_1 = require("./farmer");
const expert_1 = require("./expert");
const business_1 = require("./business");
const appointment_1 = require("./appointment");
const product_1 = require("./product");
const order_1 = require("./order");
const equipment_1 = require("./equipment");
const eqRequest_1 = require("./eqRequest");
const productCart_1 = require("./productCart");
const distributor_1 = require("./distributor");
const distRequest_1 = require("./distRequest");
function default_1(app) {
    app.use("/api/farmer", farmer_1.default);
    app.use("/api/expert", expert_1.default);
    app.use("/api/business", business_1.default);
    app.use("/api/distributor", distributor_1.default);
    app.use("/api/appointment", appointment_1.default);
    app.use("/api/product", product_1.default);
    app.use("/api/order", order_1.default);
    app.use("/api/equipment", equipment_1.default);
    app.use("/api/request", eqRequest_1.default);
    app.use("/api/product-cart", productCart_1.default);
    app.use("/api/dist-request", distRequest_1.default);
}
exports.default = default_1;
//# sourceMappingURL=index.js.map