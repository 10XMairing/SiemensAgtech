import { Request, Response, NextFunction } from "express";
import FarmerModel from "../../models/Farmer";
import { generateToken } from "../../utils";
import eventDispatcher, { EventDispatcher } from "event-dispatch";
// inputs email , password

import { Container } from "typedi";

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

    // send email to user
    eventDispatcher.dispatch("signup", farmerDoc.email);

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
