"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Appointment_1 = require("../../models/Appointment");
// inputs email , password
async function create(req, res, next) {
    try {
        const farmer = req["userData"]._id; //farmer must be authenticated
        const expert = req.params.expert; //params must give expert id
        const { price, location, date } = req.body;
        const appointment = new Appointment_1.default({
            farmer,
            expert,
            price,
            location,
            date: new Date(date)
        });
        const appointmentDoc = await appointment.save();
        return res.status(200).json({
            message: "New Appointment Created",
            details: appointmentDoc
        });
    }
    catch (err) {
        req["status"] = 400;
        next(err);
    }
}
exports.create = create;
//# sourceMappingURL=create.js.map