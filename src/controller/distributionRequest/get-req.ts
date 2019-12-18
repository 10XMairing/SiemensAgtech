import { Request, Response, NextFunction } from "express";
import DistRequestModel from "../../models/DistributionRequest";

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const requests = await DistRequestModel.find();

    return res.status(200).json({
      total: requests.length,
      requests
    });
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const _id = req.params.id;

    const doc = await DistRequestModel.findOne({ _id });

    if (!doc)
      return res.status(400).json({
        message: "Distribution Request with given id doesnot exist",
        id: _id
      });

    return res.status(200).json(doc);
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}

export async function getDistRequestByFarmer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {

    // user must be logged in as farmer
    const reqFarmer = req["userData"]._id;

    const requests = await DistRequestModel.find({ reqFarmer });

    return res.status(200).json({
      message: "All requests made by farmer",
      farmer: reqFarmer,
      total: requests.length,
      requests,
   
    });
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}
