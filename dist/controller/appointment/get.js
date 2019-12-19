"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Appointment_1 = require("../../models/Appointment");
// inputs email , password
async function getAll(req, res, next) {
    try {
        const appointments = await Appointment_1.default.find({});
        return res.status(200).json({
            message: "required for test only",
            total: appointments.length,
            appointments
        });
    }
    catch (err) {
        req["status"] = 400;
        next(err);
    }
}
exports.getAll = getAll;
async function getAppointmentForExpert(req, res, next) {
    try {
        //  requires authentication
        const expert = req["userData"]._id;
        const appointments = await Appointment_1.default.find({ expert });
        return res.status(200).json({
            message: "All appointments for expert",
            expert,
            total: appointments.length,
            appointments
        });
    }
    catch (err) {
        req["status"] = 400;
        next(err);
    }
}
exports.getAppointmentForExpert = getAppointmentForExpert;
async function getById(req, res, next) {
    try {
        const _id = req.params.id;
        const doc = await Appointment_1.default.findOne({ _id })
            .populate("farmer")
            .populate("expert");
        if (!doc)
            return res.status(400).json({
                message: "Appointment with given id doesnot exist",
                id: _id
            });
        return res.status(200).json(doc);
    }
    catch (err) {
        req["status"] = 400;
        next(err);
    }
}
exports.getById = getById;
async function getAppointmentForFarmer(req, res, next) {
    try {
        //  requires authentication
        const farmer = req["userData"]._id;
        const appointments = await Appointment_1.default.find({ farmer });
        return res.status(200).json({
            message: "All appointments for farmer",
            farmer,
            total: appointments.length,
            appointments
        });
    }
    catch (err) {
        req["status"] = 400;
        next(err);
    }
}
exports.getAppointmentForFarmer = getAppointmentForFarmer;
//# sourceMappingURL=get.js.map