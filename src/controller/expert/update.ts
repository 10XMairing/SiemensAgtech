import { Request, Response, NextFunction } from "express";
import ExpertModel from "../../models/Expert";
// inputs email , password

export async function updateExpertProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // requires farmer auth
    const farmer = req["userData"]._id;

    const data = req.body; //data must have firstName , lastName , location, profileImage
    const farmerDoc = await ExpertModel.findByIdAndUpdate(farmer, {
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
