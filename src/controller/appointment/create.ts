import { Request, Response, NextFunction } from "express";
import AppointmentModel from "../../models/Appointment";
import ExpertModel from "../../models/Expert";

import eventDispatch from "event-dispatch";

// inputs email , password

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const farmer = req["userData"]._id; //farmer must be authenticated
    const expert = req.params.expert; //params must give expert id

    const data = req.body; //price,location,description

    // check if expert data exists
    const expDoc = await ExpertModel.findById(expert);
    if (!expDoc)
      throw new Error(
        "Expert with given id doesnot exist or maly have been deleted"
      );

    const appointment = new AppointmentModel({
      farmer,
      expert,
      ...data,
      date: Date.now()
    });

    const appointmentDoc = await appointment.save();

    const expertDoc = await ExpertModel.findById(expert);

    // send email to expert
    eventDispatch.dispatch("appointment", expertDoc.email);

    return res.status(200).json({
      message: "New Appointment Created",
      details: appointmentDoc
    });
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}
