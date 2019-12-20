import { Request, Response, NextFunction } from "express";
import AppointmentModel from "../../models/Appointment";
import FarmerModel from "../../models/Farmer";
import eventDispatcher from "event-dispatch";
export async function updateStatus(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    //   requires expert authentication
    const appointment = req.params.id; //params
    const expert = req["userData"]._id; //from auth
    const confirm = req.params.confirm.toLowerCase() == "true" ? true : false;
    const appointmentDoc = await AppointmentModel.findOne({ _id: appointment });

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

      const updatedDoc = await AppointmentModel.updateOne(
        { _id: appointment },
        {
          confirmStatus: confirm
        }
      );

      //   send email

      const updated = await AppointmentModel.findOne({ _id: appointment });

      // find farmer email
      const farmerDoc = await FarmerModel.findById(updated.farmer);

      eventDispatcher.dispatch("appointment-confirm", {
        to: farmerDoc.email,
        token: farmerDoc.token
      });

      return res.status(200).json({
        message: "Appointment updated",
        appointment: updated
      });
    }
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}
