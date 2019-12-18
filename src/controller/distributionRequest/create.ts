import { Request, Response, NextFunction } from "express";
import DistRequestModel from "../../models/DistributionRequest";

// inputs email , password

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    // user must be authenticted as farmer
    const reqFarmer = req["userData"]._id;
    const reqDistributor = req.params.distributor; //eq id

    const {
      cropName,
      description,
      expectedPriceTotal,
      expectedProduce,
      location
    } = req.body;

    const eqRequestRecord = new DistRequestModel({
      cropName,
      description,
      location,
      expectedPriceTotal,
      expectedProduce,
      farmer : reqFarmer,
      distributor : reqDistributor
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
