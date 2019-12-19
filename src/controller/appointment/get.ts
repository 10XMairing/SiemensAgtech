import { Request, Response, NextFunction } from "express";
import AppointmentModel from "../../models/Appointment";

// inputs email , password

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const appointments = await AppointmentModel.find({})
      .populate("farmer")
      .populate("expert");

    return res.status(200).json({
      message: "required for test only",
      total: appointments.length,
      appointments
    });
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}

export async function getAppointmentForExpert(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    //  requires authentication
    const expert = req["userData"]._id;
    const appointments = await AppointmentModel.find({ expert })
      .populate("farmer")
      .populate("expert");

    return res.status(200).json({
      message: "All appointments for expert",
      expert,
      total: appointments.length,
      appointments
    });
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const _id = req.params.id;

    const doc = await AppointmentModel.findOne({ _id })
      .populate("farmer")
      .populate("expert");

    if (!doc)
      return res.status(400).json({
        message: "Appointment with given id doesnot exist",
        id: _id
      });

    return res.status(200).json(doc);
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}

export async function getAppointmentForFarmer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    //  requires authentication
    const farmer = req["userData"]._id;
    const appointments = await AppointmentModel.find({ farmer });

    return res.status(200).json({
      message: "All appointments for farmer",
      farmer,
      total: appointments.length,
      appointments
    });
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}
