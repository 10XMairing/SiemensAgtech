"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Appointment_1 = require("../../models/Appointment");
async function updateStatus(req, res, next) {
    try {
        //   requires expert authentication
        const appointment = req.params.id; //params
        const expert = req["userData"]._id; //from auth
        const confirm = req.params.confirm.toLowerCase() == "true" ? true : false;
        const appointmentDoc = await Appointment_1.default.findOne({ _id: appointment });
        if (!appointmentDoc)
            return res.status(400).json({
                message: "Appointment with given id doesnot exist",
                data: {
                    id: appointment,
                    expert
                }
            });
        if (appointmentDoc.expert != expert)
            return res.status(401).json({
                message: "Given user doesnot have access to this document",
                data: {
                    id: appointment,
                    expert
                }
            });
        else {
            // give expert has access proceed with modify
            const updatedDoc = await Appointment_1.default.updateOne({ _id: appointment }, {
                confirmStatus: confirm
            });
            //   send email
            const updated = await Appointment_1.default.findOne({ _id: appointment });
            return res.status(200).json({
                message: "Appointment updated",
                appointment: updated
            });
        }
    }
    catch (err) {
        req["status"] = 400;
        next(err);
    }
}
exports.updateStatus = updateStatus;
//# sourceMappingURL=update-status.js.map