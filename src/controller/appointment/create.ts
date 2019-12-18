import { Request, Response, NextFunction } from "express";
import AppointmentModel from "../../models/Appointment";

// inputs email , password

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const farmer = req["userData"]._id; //farmer must be authenticated
    const expert = req.params.expert; //params must give expert id

    const { price, location, date } = req.body;

    const appointment = new AppointmentModel({
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
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}
