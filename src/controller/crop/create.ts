import { Request, Response, NextFunction } from "express";
import CropModel from "../../models/Crop";
import { Logger } from "winston";
import { Container } from "typedi";

const logger: Logger = Container.get("logger");
// inputs email , password

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    // user must be authenticted as farmer
    const farmer = req["userData"]._id;

    const data = req.body; // body should have name, description, expPrice
    const cropRecord = new CropModel({ ...data, farmer });

    const cropDoc = await cropRecord.save();

    return res.status(200).json({
      message: "new crop record created for farmer",
      farmer,
      crop: cropDoc
    });
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}
