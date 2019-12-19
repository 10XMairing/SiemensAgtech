import { Request, Response, NextFunction } from "express";
import FarmerModel from "../../models/Farmer";
// inputs email , password

export async function updateFarmerProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // requires farmer auth
    const farmer = req["userData"]._id;

    const data = req.body; //data must have firstName , lastName , location, profileImage
    const farmerDoc = await FarmerModel.findByIdAndUpdate(farmer, {
      ...data
    });

    return res.status(200).json({
      message: "Farmer profile updated",
      farmer,
      keys: Object.keys(data)
    });
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}
