import { Request, Response, NextFunction } from "express";
import BusinessModel from "../../models/Business";
import {generateToken} from "../../utils"
// inputs email , password

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;

    const business = new BusinessModel({
      email,
      password
    });

    const businessDoc = await business.save();

    let businessRecord = businessDoc.toObject();
    delete businessRecord.password;

    const token = await generateToken({
      _id: businessDoc._id,
      email: businessDoc.email,
      type: "business"
    });

    return res.status(200).json({
      message: "Business registered",
      business: businessRecord,
      token
    });
  } catch (err) {
    req["status"] = 400;
    next(err);
  }
}
