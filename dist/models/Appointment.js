"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const IAppointmentSchema = new mongoose.Schema({
    expert: { type: mongoose.Schema.Types.ObjectId, ref: "Expert" },
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer" },
    price: { type: Number, required: true },
    date: { type: Date, required: true },
    description: { type: String, default: "" },
    confirmStatus: { type: Boolean, default: false }
}, {
    timestamps: true
});
exports.default = mongoose.model("Appointment", IAppointmentSchema);
//# sourceMappingURL=Appointment.js.map