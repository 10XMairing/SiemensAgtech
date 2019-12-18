import { Request, Response, NextFunction } from "express";
import DistributorModel from "../../models/Distributor";
import { generateToken } from "../../utils";
// inputs email , password

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;

    const distributor = new DistributorModel({
      email,
      password
    });

    const distributorDoc = await distributor.save();

    let distRecord = distributorDoc.toObject();
    delete distRecord.password;

    // generate token
    const token = await generateToken({
      _id: distributorDoc._id,
      email: distributorDoc.email,
      type: "distributor"
    });

    return res.status(200).json({
      message: "distributor registered",
      user: distRecord,
      token
    });
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}
