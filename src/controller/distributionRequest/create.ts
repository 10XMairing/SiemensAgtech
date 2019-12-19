import { Request, Response, NextFunction } from "express";
import DistRequestModel from "../../models/DistributionRequest";

// inputs email , password

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    // user must be authenticted as farmer
    const reqFarmer = req["userData"]._id;
    const data = req.body;

    const eqRequestRecord = new DistRequestModel({
      ...data,
      farmer: reqFarmer
    });

    const eqRequestDoc = await eqRequestRecord.save();

    return res.status(200).json({
      message: "New Distribution request created",
      data: eqRequestDoc
    });
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}
