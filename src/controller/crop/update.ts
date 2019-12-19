import { Request, Response, NextFunction } from "express";
import CropModel from "../../models/Crop";
import { Logger } from "winston";
import { Container } from "typedi";

const logger: Logger = Container.get("logger");
// inputs email , password

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    // user must be authenticted as farmer
    const farmer = req["userData"]._id;
    const crop = req.params.crop;

    const data = req.body; // body should have name, description, expPrice
    const cropDoc = await CropModel.findByIdAndUpdate(
      { farmer, _id: crop },
      { ...data }
    );

    return res.status(200).json({
      message: "crop record updated for farmer",
      farmer,
      crop: cropDoc,
      data
    });
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}
