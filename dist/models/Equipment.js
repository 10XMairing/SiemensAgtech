"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const EquipmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    nStock: { type: Number, default: 1 },
    available: { type: Boolean, default: true },
    description: { type: String, default: "" },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    farmer: { ref: "Farmer", type: mongoose.Schema.Types.ObjectId }
}, {
    timestamps: true
});
// this methods do not work yet
EquipmentSchema.methods.updateStock = function (num) {
    this["nStock"] = num;
    return this;
};
EquipmentSchema.methods.decrementStock = function (num) {
    this["nStock"] -= num;
    return this;
};
exports.default = mongoose.model("Equipment", EquipmentSchema);
//# sourceMappingURL=Equipment.js.map