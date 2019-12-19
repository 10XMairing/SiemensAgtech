import { Request, Response, NextFunction } from "express";
import FarmerModel from "../../models/Farmer";
import { generateToken } from "../../utils";
// inputs email , password

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = req.body; //data must have firstName , lastName , location(opt), email , password

    const farmer = new FarmerModel({
      ...data
    });

    const farmerDoc = await farmer.save();

    let farmerRecord = farmerDoc.toObject();
    delete farmerRecord.password;

    // generate token
    const token = await generateToken({
      _id: farmerDoc._id,
      email: farmerDoc.email,
      type: "farmer"
    });

    return res.status(200).json({
      message: "Farmer registered",
      farmer: farmerRecord,
      token
    });
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}
