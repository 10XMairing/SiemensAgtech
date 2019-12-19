"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Equipment_1 = require("./Equipment");
const EquipmentRequestSchema = new mongoose.Schema({
    equipment: {
        type: Object //stamp of equipment object
    },
    nQuantity: { type: Number, default: 1 },
    nDays: { type: Number, default: 1 },
    reqFarmer: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer" },
    accFarmer: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer" },
    dateRequired: { type: Date },
    confirmStatus: { type: Boolean, default: false },
    paymentStatus: { type: Boolean, default: false },
    total: { type: Number }
}, {
    timestamps: true
});
EquipmentRequestSchema.pre("save", async function (next) {
    var req = this;
    var equipment = req["equipment"]; //equipment id;
    const eqRecord = await Equipment_1.default.findById(equipment);
    if (!eqRecord)
        next(new Error(`Equipment with id ${equipment} does not exist`));
    else {
        // save equiment stamp
        if (eqRecord.nStock < this["nQuantity"])
            next(new Error("Not enough equipment stock"));
        this["equipment"] = eqRecord;
        this["total"] = eqRecord.price * this["nQuantity"] * this["nDays"];
        this["accFarmer"] = eqRecord.farmer;
        next();
    }
});
exports.default = mongoose.model("EquipmentRequest", EquipmentRequestSchema);
//# sourceMappingURL=EquipmentRequest.js.map