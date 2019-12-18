import { Request, Response, NextFunction } from "express";
import DistributorModel from "../../models/Distributor";
import { generateToken } from "../../utils";
// inputs email , password

export async function updateProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // must be logged in as distributor

    const id = req["userData"]._id;

    const {
      firstName,
      lastName,
      businessName,
      isAvailable,
      acceptedCrops
    } = req.body;

    const DistributorDoc = await DistributorModel.findByIdAndUpdate(
      id,
      req.body
    );

    return res.status(200).json({
      message: "Updated distributor",
      data: Object.keys(req.body)
    });
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}
