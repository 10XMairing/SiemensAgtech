"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const typedi_1 = require("typedi");
const logger = typedi_1.Container.get("logger");
const DistRequestSchema = new mongoose.Schema({
    cropName: { type: String, required: true, lowercase: true, trim: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    expectedPriceTotal: { type: Number, required: true },
    expectedProduce: { type: Number, required: true },
    rate: { type: Number },
    price: { type: Number },
    paymentStatus: { type: Boolean, default: false },
    confirmStatus: { type: Boolean, default: false },
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer" },
    distributor: { type: mongoose.Schema.Types.ObjectId, ref: "Distributor" }
}, {
    timestamps: true
});
exports.default = mongoose.model("DistributionRequest", DistRequestSchema);
//# sourceMappingURL=DistributionRequest.js.map